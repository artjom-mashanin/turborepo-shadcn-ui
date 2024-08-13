import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Props = {
  content: string;
};

export function Markdown({ content }: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={
        {
          // h1: ({ node, ...rest }) => <Heading {...rest} className="text-red-600" variant="h1" />,
        }
      }
    >
      {content}
    </ReactMarkdown>
  );
}
