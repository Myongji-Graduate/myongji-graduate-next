'use client';
import Modal from '../../view/molecule/modal/modal';
import Form from '../../view/molecule/form';
import { deleteUser } from '@/app/business/services/user/user.command';
import { DIALOG_KEY } from '@/app/utils/key/dialog-key.util';
import TitleBox from '../../view/molecule/title-box/title-box';

export default function UserDeleteModal() {
  return (
    <Modal modalKey={DIALOG_KEY.USER_DELETE}>
      <div className="max-lg:w-72 lg:p-6">
        <TitleBox title="회원 탈퇴">
          <div className="text-sm text-center my-4">
            <p>회원탈퇴를 진행하시겠습니까?</p>
            <p>탈퇴를 진행하려면 비밀번호 입력이 필요합니다.</p>
          </div>
          <div className="w-full">
            <Form className="space-y-4" failMessageControl={'toast'} action={deleteUser} id={'user-delete'}>
              <Form.PasswordInput label="비밀번호" id="password" placeholder="비밀번호를 입력하세요" required={true} />
              <Form.SubmitButton label="탈퇴하기" position="center" variant="primary" />
            </Form>
          </div>
          <p className="text-xs text-center my-4">졸업을 부탁해 서비스를 이용해 주셔서 감사합니다.</p>
        </TitleBox>
      </div>
    </Modal>
  );
}
