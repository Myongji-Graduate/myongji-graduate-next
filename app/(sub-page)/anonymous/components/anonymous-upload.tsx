import UploadTakenLectureAnonymous from '@/app/ui/lecture/upload-taken-lecture/upload-taken-lectrue-anonymous';
import { FormState } from '@/app/ui/view/molecule/form/form-root';

interface AnonymousUploadProp {
  onNext?: (formState?: FormState) => void;
}

export default function AnonymousUpload({ onNext }: AnonymousUploadProp) {
  return <UploadTakenLectureAnonymous onSuccess={onNext} />;
}
