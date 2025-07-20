import Button from '@/app/ui/view/atom/button/button';
import TitleBox from '@/app/ui/view/molecule/title-box/title-box';

interface SignUpTermProps {
  onNext?: () => void;
}

// 약관내용 최신화 필요(* 검사 대상)
export default function SignUpTerm({ onNext }: SignUpTermProps) {
  const handleAgreeButtonClick = () => {
    onNext?.();
  };

  return (
    <div className=" mx-auto my-8 md:p-6 bg-white ">
      <TitleBox title="약관동의">
        <div className="border p-6 pl-8 rounded-lg">
          <ul className="list-disc space-y-4 text-sm ">
            <li>
              현재 검사 가능한 학과-학번은 아래과 같습니다. 검사대상에 속하지 않다면 검사가 불가능합니다. 꼭
              검사대상인지 확인하세요!
              <ul className="list-disc ml-6 mt-2">
                <li>
                  대학: 인문대학, 사회과학대학, 미디어·휴먼라이프대학, 경영대학, 인공지능·소프트웨어융합대학
                  <span className="ml-1 text-red-400">미래융합대학(불가)</span>
                </li>
                <li>학번: 16학번 ~</li>
              </ul>
            </li>
            <li>
              교직, 연계전공, 재외국민/외국인전형에 해당하는 사용자는 검사 기준이 따로 설정되지 않아 검사가
              불가능합니다.
            </li>
            <li>검사를 위해선 성적표를 직접 업로드해야하므로 PC환경에서 진행하는 것을 권장합니다.</li>
            <li>
              검사 기준은 최신버전 학사안내문(2025.03.01) 반영하여 설정되었으며, 학사안내문은 매년 개편되므로 자신이
              알고 있는 구버전과 다를 수 있습니다.
              <ul className="list-disc ml-6 mt-2">
                <li>
                  <a
                    target={'_blank'}
                    className="text-blue-500 underline	 "
                    href="https://www.mju.ac.kr/mjukr/257/subview.do?enc=Zm5jdDF8QEB8JTJGYmJzJTJGbWp1a3IlMkYxNDMlMkYyMDI1ODAlMkZhcnRjbFZpZXcuZG8lM0ZwYWdlJTNEMSUyNnNyY2hDb2x1bW4lM0RzaiUyNnNyY2hXcmQlM0QlRUQlOTUlOTklRUMlODIlQUMlMjZiYnNDbFNlcSUzRCUyNmJic09wZW5XcmRTZXElM0QlMjZyZ3NCZ25kZVN0ciUzRCUyNnJnc0VuZGRlU3RyJTNEJTI2aXNWaWV3TWluZSUzRGZhbHNlJTI2aXNWaWV3JTNEdHJ1ZSUyNnBhc3N3b3JkJTNEJTI2"
                  >
                    명지대학교 학사안내문 참고 링크
                  </a>
                </li>
              </ul>
            </li>
            <li>
              본 서비스 정보는 공식적인 효력을 갖지 않으며,{' '}
              <b>정확한 졸업사정결과를 위해서는 소속 단과대 교학팀에서의 확인을 권장합니다.</b>
            </li>
            <li>
              저장된 사용자 데이터베이스는 익명화되어 저장되고 과목추천 및 교양과목 통계에만 사용되며, 익명 다른 용도로
              사용되지 않습니다.
            </li>
            <li>졸업요건 기준이 잘못 설정되었거나, 오류발생 시 우측 하단 채널톡으로 피드백 부탁드립니다.</li>
          </ul>
        </div>
      </TitleBox>

      <div className="mt-8 flex justify-center">
        <Button
          onClick={handleAgreeButtonClick}
          // className="ml-4 bg-blue-500 text-white py-2 px-4 rounded-full"
          size={'md'}
          label={'동의합니다'}
        />
      </div>
    </div>
  );
}
