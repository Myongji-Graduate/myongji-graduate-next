import { DIALOG_KEY } from '@/app/utils/key/dialog.key';
import Modal from '../../view/molecule/modal/modal';

export default function UserDeleteModal() {
  return (
    <Modal modalKey={DIALOG_KEY.USER_DEELETE}>
      <div className="text-center">test</div>
    </Modal>
  );
}
