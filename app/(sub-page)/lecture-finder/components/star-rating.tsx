import React from 'react';
import { Star, StarHalf, StarOff } from 'lucide-react';

type Rating = number | string | null;

interface StarRatingProps {
  value: Rating;
  size?: number;
  showValue?: boolean;
  ariaLabel?: string;
}

export default function StarRating({ value, size = 18, showValue = false, ariaLabel }: StarRatingProps) {
  if (value == null) return <span className="text-gray-400">평가 없음</span>;

  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  const rounded = Math.round(numericValue * 2) / 2;
  const full = Math.floor(rounded);
  const hasHalf = rounded - full === 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);

  return (
    <div
      className="inline-flex items-center gap-1"
      aria-label={ariaLabel ?? `별점 ${rounded}점 / 5점`}
      title={`${rounded} / 5`}
    >
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`f-${i}`} size={size} className="text-amber-400 fill-amber-400" />
      ))}
      {hasHalf && <StarHalf size={size} className="text-amber-400 fill-amber-400" />}
      {Array.from({ length: empty }).map((_, i) => (
        <StarOff key={`e-${i}`} size={size} className="text-gray-300" />
      ))}
      {showValue && <span className="ml-1 text-sm text-gray-600">{rounded.toFixed(1)}</span>}
    </div>
  );
}
