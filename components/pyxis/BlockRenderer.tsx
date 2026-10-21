import { blocks as registry } from '@/blocks';
import type { PyxisBlock } from '@/lib/pyxis/types';
import { MissingBlock } from './MissingBlock';

// Developers and editors see blocks without a component; site visitors do not.
const isDevelopment = process.env.NODE_ENV === 'development';

export function BlockRenderer({ blocks, isPreview = false }: { blocks: PyxisBlock[] | null; isPreview?: boolean }) {
  return (blocks ?? []).map((block, index) => {
    const Component = registry[block.type];

    if (Component) {
      return <Component key={index} block={block} />;
    }

    return isDevelopment || isPreview ? <MissingBlock key={index} block={block} /> : null;
  });
}