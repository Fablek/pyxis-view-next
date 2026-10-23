import type { PyxisBlock, PyxisMedia } from '@/lib/pyxis/types';

type ObrazBlock = PyxisBlock<{
  obrazek: PyxisMedia | null;
}>;

export default function Obraz({ block }: { block: ObrazBlock }) {
  const { obrazek } = block.data;

  if (!obrazek?.url) {
    return null;
  }

  return (
    <figure className="my-10">
      <img
        src={obrazek.url}
        alt={obrazek.alt ?? ''}
        width={obrazek.width ?? undefined}
        height={obrazek.height ?? undefined}
        className="w-full rounded-2xl"
      />
      {obrazek.title && <figcaption className="mt-2 text-sm text-gray-500">{obrazek.title}</figcaption>}
    </figure>
  );
}