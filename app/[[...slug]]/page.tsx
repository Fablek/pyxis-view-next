import { cookies } from 'next/headers';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BlockRenderer } from '@/components/pyxis/BlockRenderer';
import { fetchPage } from '@/lib/pyxis/api';

/**
 * Entry point for all pages managed by Pyxis CMS (catch-all route).
 */
export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await props.params;
  const previewToken = (await cookies()).get('pyxis_preview')?.value;

  const page = await fetchPage(slug?.join('/'), previewToken);

  if (!page) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto p-10 font-sans">
      {page.is_preview && (
        <div className="fixed top-0 left-0 w-full bg-black text-white py-2 px-4 flex justify-between items-center z-50 text-sm font-bold shadow-xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            TRYB PODGLĄDU AKTYWNY
          </div>
          <Link href="/api/exit-preview" className="bg-white text-black px-3 py-1 rounded hover:bg-slate-200 transition">
            Wyłącz podgląd
          </Link>
        </div>
      )}

      <header className={`mb-8 border-b pb-8 ${page.is_preview ? 'mt-12' : ''}`}>
        <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight">{page.title}</h1>
      </header>

      <BlockRenderer blocks={page.content} isPreview={page.is_preview} />
    </main>
  );
}