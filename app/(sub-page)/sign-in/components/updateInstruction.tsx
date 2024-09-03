'use client';
import useDialog from '@/app/hooks/useDialog';
import Button from '@/app/ui/view/atom/button/button';
import { AlertDialog, AlertDialogContent } from '@/app/ui/view/molecule/alert-dialog/alert-dialog';
import { DIALOG_KEY } from '@/app/utils/key/dialog-key.util';
import { useRouter } from 'next/navigation';

export default function UpdateInstruction() {
  const router = useRouter();
  const { isOpen, close } = useDialog(DIALOG_KEY.UPDATE_INSTRUCTION);
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <div className="flex flex-col gap-4">
          <div className="text-xl font-bold">업데이트 안내문</div>
          <p className="text-gray-800 leading-6">
            <span className="text-primary font-bold">졸업을 부탁해</span>가 2.0.2 버전으로 업데이트됨에 따라, 2024년 9월
            3일 이전에 성적표를 업로드하신 모든 사용자께서는 성적표를 재업로드해 주시기 바랍니다.
            <br />
            감사합니다.
          </p>
          <Button
            label="확인"
            size="xs"
            variant="list"
            style={{ alignSelf: 'flex-end' }}
            onClick={() => {
              close();
              router.push('/grade-upload');
            }}
          />
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
