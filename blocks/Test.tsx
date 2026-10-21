import type { PyxisBlock } from '@/lib/pyxis/types';

type TestBlock = PyxisBlock<{
  section_title: string | null;
  test: string | null;
}>;

export default function Test({ block }: { block: TestBlock }) {
  const { section_title, test } = block.data;

  return (
    <section className="my-10 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
      {section_title && <h2 className="text-3xl font-bold text-gray-900">{section_title}</h2>}
      {test && <p className="mt-3 text-lg text-gray-600">{test}</p>}
    </section>
  );
}