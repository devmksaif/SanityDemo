"use client";

import { TextBlock } from './blocks/text-block';
import { ImageBlock } from './blocks/image-block';

const components: { [key: string]: React.ComponentType<any> } = {
  textBlock: TextBlock,
  imageBlock: ImageBlock,
};

export function BlockRenderer({ blocks }: { blocks: any[] }) {
  return (
    <div>
      {blocks.map((block) => {
        const Component = components[block._type];
        if (!Component) {
          console.warn(`Component for block type "${block._type}" not found.`);
          return null;
        }
        return <Component key={block._key} data={block} />;
      })}
    </div>
  );
}