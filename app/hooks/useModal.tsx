import { useState } from 'react';

export default function useModal() {
  const [visible, setVisible] = useState(false);

  const toggle = () => {
    setVisible((prev) => !prev);
  };

  const close = () => {
    setVisible(false);
  };

  return { visible, toggle, close };
}
