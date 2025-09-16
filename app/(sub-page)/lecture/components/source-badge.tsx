import React from 'react';
import Link from 'next/link';

interface SourceBadgeProps {
  name: string;
  url: string;
  note?: string;
  className?: string;
}

export default function SourceBadge({ name, url, note, className = '' }: SourceBadgeProps) {
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[11px] md:text-xs
        bg-white hover:bg-gray-50 text-gray-600 border-gray-200 ${className}`}
      title={`${name}${note ? ` · ${note}` : ''}`}
    >
      <span className="font-medium">{name}</span>
      {note ? <span className="text-gray-400">· {note}</span> : null}
      <span aria-hidden>↗</span>
    </Link>
  );
}
