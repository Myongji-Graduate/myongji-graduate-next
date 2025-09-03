import Select from '@/app/ui/view/molecule/select';

function CompletionClassificationDropdown() {
  return (
    <Select placeholder="이수구분">
      {/* 임시. 추후 확인 필요 */}
      <Select.Item value="전공선택" placeholder="전공선택" />
      <Select.Item value="전공필수" placeholder="전공필수" />
      <Select.Item value="학문기초교양" placeholder="학문기초교양" />
      <Select.Item value="공통교양" placeholder="공통교양" />
      <Select.Item value="핵심교양" placeholder="핵심교양" />
      <Select.Item value="채플" placeholder="채플" />
      <Select.Item value="일반교양" placeholder="일반교양" />
      <Select.Item value="자유선택" placeholder="자유선택" />
    </Select>
  );
}

export default CompletionClassificationDropdown;
