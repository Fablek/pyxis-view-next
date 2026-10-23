import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { secret, path } = body;

        // Verify token – reject everything when no token is configured
        const expectedToken = process.env.REVALIDATE_TOKEN;

        if (!expectedToken || secret !== expectedToken) {
            console.warn('[Revalidate] Unauthorized attempt');
            return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        }

        if (!path) {
            return NextResponse.json({ message: 'Path is required' }, { status: 400 });
        }

        // Normalization
        let cleanPath = path === 'homepage' ? '/' : path;
        if (!cleanPath.startsWith('/')) {
            cleanPath = `/${cleanPath}`;
        }

        console.log(`[Revalidate] Purging cache for: ${cleanPath}`);

        // Do revalidation
        revalidatePath(cleanPath, 'page');

        return NextResponse.json({ 
            revalidated: true, 
            path: cleanPath,
            now: Date.now() 
        });
    } catch (error) {
        console.error('[Revalidate Error]', error);
        return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
    }
}