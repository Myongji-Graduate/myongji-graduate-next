import { useState } from 'react';
import { z } from 'zod';

export type FileType = File | null;

export default function useFile() {
  const [file, setFile] = useState<FileType>(null);

  const changeFile = (file: File) => {
    if (!validate.parse(file.name)) return;
    setFile(file);
  };

  const validate = z.string().refine((value) => value.endsWith('.pdf'), {
    message: 'File must be a PDF',
  });

  return { file, changeFile };
}
