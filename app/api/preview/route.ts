import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const path = searchParams.get('path');
  const expires = searchParams.get('expires');
  const signature = searchParams.get('signature');

  // Params validation
  if (!path || !expires || !signature) {
    return new Response('Brak parametrów autoryzacji', { status: 400 });
  }

  // Use from env
  const internalUrl = process.env.INTERNAL_API_URL;
  const verifyUrl = `${internalUrl}/api/preview/verify?path=${path}&expires=${expires}&signature=${signature}`;

  try {
    const response = await fetch(verifyUrl, { cache: 'no-store' });
    const data = await response.json();

    if (!response.ok || !data.valid) {
      return new Response('Nieautoryzowany dostęp - błędna sygnatura', { status: 401 });
    }

    // Set cookies
    const cookieStore = await cookies();
    cookieStore.set('pyxis_preview', data.preview_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 3600 // 1h
    });

    // Redirect
    const redirectPath = (path === 'homepage' || path === '') ? '/' : `/${path}`;
    
    console.log(`[Preview] Authorized, redirecting to: ${redirectPath}`);
  } catch (error) {
    console.error('[Preview Error]', error);
    return new Response('Błąd połączenia z API backendu', { status: 500 });
  }

  const redirectPath = (path === 'homepage' || path === '') ? '/' : `/${path}`;
  redirect(redirectPath);
}