'use client';
import { DIALOG_KEY } from '@/app/utils/key/dialog.key';
import Modal from '../../view/molecule/modal/modal';
import Form from '../../view/molecule/form';
import { deleteUser } from '@/app/business/user/user.command';

export default function UserDeleteModal() {
  return (
    <Modal modalKey={DIALOG_KEY.USER_DEELETE}>
      <div className="max-w-sm mx-auto my-12 p-6 border rounded-lg shadow-md bg-white">
        <h2 className="text-xl font-bold text-center">회원 탈퇴</h2>
        <div className="h-1 w-10 bg-blue-600 mx-auto my-3" />
        <p className="text-sm text-center my-4">
          회원탈퇴를 진행하시겠습니까? 탈퇴를 진행하면더 비밀번호 입력이 필요합니다.
        </p>
        <div className="my-4">
          <Form failMessageControl={'toast'} action={deleteUser} id={'user-delete'}>
            <Form.PasswordInput label="비밀번호" id="password" placeholder="비밀번호를 입력하세요" required={true} />
            <Form.SubmitButton label="탈퇴하기" position="center" variant="primary" />
          </Form>
        </div>
        <p className="text-xs text-center my-4">정보를 누락하여 서비스를 이용해 주셔서 감사합니다.</p>
      </div>
    </Modal>
  );
}
