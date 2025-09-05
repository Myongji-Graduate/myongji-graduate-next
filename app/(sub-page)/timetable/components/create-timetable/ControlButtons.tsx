import Button from '@/app/ui/view/atom/button/button';

function ControlButtons() {
  return (
    <div className="flex justify-between">
      <Button label="과목 추가" size="xs" />
      <div className="flex gap-3">
        <Button label="초기화" size="xs" variant="outlined" />
        <Button label="저장" size="xs" variant="outlined" />
        <Button label="삭제" size="xs" variant="outlined" />
      </div>
    </div>
  );
}

export default ControlButtons;
