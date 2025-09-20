import React from 'react';
import Link from 'next/link';

export default function SourceBadge() {
  const data = {
    name: '에브리타임',
    url: 'https://everytime.kr/',
    note: '크롤링 기반',
    lastCrawledAt: '2025-09-16 23:00',
  };

  const { url, name, note, lastCrawledAt } = data;
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[11px] md:text-xs
        bg-white hover:bg-gray-50 text-gray-600 border-gray-200"
      title={`${name}${note ? ` · ${note}` : ''}`}
    >
      <span className="font-medium">{name}</span>
      {note ? <span className="text-gray-400">· {note}</span> : null}
      <span aria-hidden>↗</span>
    </Link>
  );
}
