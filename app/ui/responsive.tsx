'use client';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';

interface ResponsiveProps {
  minWidth?: number;
  maxWidth?: number;
}

export default function Responsive({ minWidth, maxWidth, children }: React.PropsWithChildren<ResponsiveProps>) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  let breakPoint = '(min-width: 0px)';
  if (minWidth && maxWidth) breakPoint = `(min-width:${minWidth}px) and (max-width:${maxWidth}px)`;
  else if (minWidth) breakPoint = `(min-width:${minWidth}px)`;
  else if (maxWidth) breakPoint = `(max-width:${maxWidth}px)`;

  const isBreakPoint = useMediaQuery(breakPoint);
  return <>{isClient && (isBreakPoint ? children : null)}</>;
}
