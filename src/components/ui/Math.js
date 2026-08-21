'use client';

import katex from 'katex';

export default function Math({ math, block = false, className = '' }) {
  try {
    const html = katex.renderToString(math, {
      displayMode: block,
      throwOnError: false,
    });

    return (
      <span
        className={`${className} ${block ? 'block text-center py-2' : 'inline-block px-1'}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  } catch (err) {
    return <code className="font-code-md text-secondary">{math}</code>;
  }
}
