import type { PyxisBlock } from '@/lib/pyxis/types';

export function MissingBlock({ block }: { block: PyxisBlock }) {
  return (
    <section className="my-6 rounded-lg border-2 border-dashed border-amber-400 bg-amber-50 p-4 text-sm text-amber-900">
      <p className="font-semibold">
        Brak komponentu dla bloku <code className="rounded bg-amber-100 px-1">{block.type}</code>
      </p>
      <p className="mt-1">
        Utwórz komponent w <code>blocks/</code> i zarejestruj go w <code>blocks/index.ts</code>.
      </p>
      <pre className="mt-3 overflow-x-auto rounded bg-white/70 p-3 text-xs">{JSON.stringify(block.data, null, 2)}</pre>
    </section>
  );
}