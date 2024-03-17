import Button from '@/app/ui/view/atom/button/button';

interface SignUpTermProps {
  onNext?: () => void;
}

export default function SignUpTerm({ onNext }: SignUpTermProps) {
  const handleAgreeButtonClick = () => {
    onNext?.();
  };

  return (
    <div className="max-w-2xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6">알림독의 안내문</h1>
      <ul className="list-disc space-y-4 text-sm">
        <li>
          현재 저희 기능은 한국-한국은 아니라 한국-외국도 가능합니다. 각사별에서 수하인 없더라도 저희가 받는데까지는
          무관합니다만, 꼭 관세사무소와 협의하세요!
          <ul className="list-disc ml-6 mt-2">
            <li>대상: 국외발송, 북부발송, 사회복지대상, ICT용품대상, 일반대상, 미래용품대상(확인)</li>
            <li>발송: 16 ~ 22시발</li>
          </ul>
        </li>
        <li>
          교직, 디자인, 연계개발, 물품, 전자, 자원관리/회계지원에 해당하는 사용자는 각사 기준에 따른 선정되지 않아 각사
          별 관리하는데요.
        </li>
        <li>검사를 위해서 선적품을 직접 연락드려야만 PC화면에서 진행하는 것을 권장합니다.</li>
        <li>
          검사 기준은 최신버전 확인내역(2023.07.24) 반영하여 선정되었으며, 학사내역은 매년 개편되므로 자사이 외고 있는
          구버전과 다를 수 있습니다.
          <ul className="list-disc ml-6 mt-2">
            <li>문자대항: 학사내역은 확인 클릭</li>
          </ul>
        </li>
        <li>
          본 서비스 정보는 공식적인 확인을 전제 않으며, 정확한 증상조사결과를 위해 서류 또는 담당과 교류해야할 사항을
          잊지 않습니다.
        </li>
        <li>
          전자문 서화지 데이터베이스는 의무화되어 저희가 고유축적 및 교육과정 등에서 사용되며, 어떤 다른 용도로 사용
          되지 않습니다.
        </li>
        <li>특허요건 기준이 전문 선정되었거나, 오류발생 시 우측 하단 채팅창으로 또는 담당 부서로문의합니다.</li>
      </ul>
      <div className="mt-8 flex justify-center">
        <Button
          onClick={handleAgreeButtonClick}
          className="ml-4 bg-blue-500 text-white py-2 px-4 rounded-full"
          label={'알림독의 안내문'}
        />
      </div>
    </div>
  );
}
