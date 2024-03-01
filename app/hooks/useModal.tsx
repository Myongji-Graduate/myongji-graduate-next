import { useEffect, useRef, useState } from 'react';

export default function useModal() {
  const [visible, setVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (e: Event) => {
    const current = modalRef.current;
    if (visible && current && !current.contains(e.target as Node)) setVisible(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [visible]);

  const toggle = () => {
    setVisible((prev) => !prev);
  };

  return { visible, modalRef, toggle };
}
