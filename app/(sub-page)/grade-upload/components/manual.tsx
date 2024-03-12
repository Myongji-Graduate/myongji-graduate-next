export default function Manual() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-6">
        <h1 className="text-center text-3xl font-bold p-4 border-b-2 border-gray-100 md:text-4xl">
          한 번의 성적표 입력으로
          <br /> 맞춤형 결과를 확인하세요 !
        </h1>
        <div className="text-base flex flex-col gap-2 md:text-lg">
          <div>
            1.
            <a
              target="_blank"
              className="pl-1 text-primary hover:text-dark-hover"
              href="https://msi.mju.ac.kr/servlet/security/MySecurityStart"
            >
              MyiWeb MSI
            </a>
            에 접속 후 로그인(PC환경 권장)
          </div>
          <div>2. 좌측 성적/졸업 메뉴 → 성적표(상담용,B4)클릭</div>
          <div>3. 우측 상단 조회버튼 클릭 → 프린트 아이콘 클릭</div>
          <div>4. 인쇄 정보의 대상(PDF로 저장) 설정 → 하단 저장 버튼 클릭 </div>
          <div>5. 저장한 파일 업로드 </div>
          <div className="text-xs md:text-sm text-primary">
            • 회원 가입한 학번과 일치하는 학번의 성적표를 입력해야 합니다.
          </div>
        </div>
      </div>
    </div>
  );
}
