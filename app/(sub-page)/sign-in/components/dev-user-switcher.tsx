import {
  fetchDevTestUsers,
  fetchPolicyPreviewOptions,
  loginAsDevTestUser,
  previewGraduationPolicy,
} from '@/app/business/services/user/dev-user.command';

export default async function DevUserSwitcher() {
  if (process.env.NEXT_PUBLIC_ENABLE_DEV_LOGIN !== 'true' || process.env.NODE_ENV === 'production') {
    return null;
  }

  const [{ majors }, users] = await Promise.all([fetchPolicyPreviewOptions(), fetchDevTestUsers()]);
  const entryYears = Array.from({ length: 11 }, (_, index) => 26 - index);

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-900">학과·학번별 졸업요건 조회</h2>
          <p className="mt-1 text-xs text-gray-500">16~26학번 졸업요건을 수기 검수합니다.</p>
        </div>
        <span className="rounded bg-amber-100 px-2 py-1 text-[10px] font-semibold text-amber-800">LOCAL ONLY</span>
      </div>
      <form
        action={previewGraduationPolicy}
        className="mb-5 space-y-4 rounded-xl border border-blue-200 bg-blue-50 p-4 shadow-sm"
      >
        <div className="rounded-lg bg-white px-3 py-2 text-xs leading-5 text-gray-600">
          진입할 때마다 수강내역을 <strong className="text-gray-900">0개로 초기화</strong>합니다. 결과 화면에서 고정
          필수과목과 택1·택2·택N 그룹을 확인하세요.
        </div>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-gray-700">학과</span>
          <select
            className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm"
            name="major"
            required
            defaultValue=""
          >
            <option disabled value="">
              학과 선택
            </option>
            {majors.map((major) => (
              <option key={major} value={major}>
                {major}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-gray-700">입학 학번</span>
          <select
            className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm"
            name="entryYear"
            required
            defaultValue=""
          >
            <option disabled value="">
              입학 학번 선택
            </option>
            {entryYears.map((year) => (
              <option key={year} value={year}>
                {year}학번
              </option>
            ))}
          </select>
        </label>
        <button
          className="h-11 w-full rounded-lg bg-blue-600 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          type="submit"
        >
          미수강 상태로 졸업요건 보기
        </button>
      </form>
      <details className="rounded-lg border border-gray-200 bg-white">
        <summary className="cursor-pointer px-3 py-2 text-xs font-medium text-gray-500">
          실제 수강내역이 있는 최근 사용자로 확인
        </summary>
        <div className="max-h-52 space-y-2 overflow-y-auto border-t border-gray-100 p-2">
          {users.map((user) => (
            <form action={loginAsDevTestUser} key={user.id}>
              <input name="userId" type="hidden" value={user.id} />
              <button
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-left transition hover:border-blue-400 hover:bg-blue-50"
                type="submit"
              >
                <span className="block text-sm font-medium text-gray-900">{user.name}</span>
                <span className="block truncate text-xs text-gray-500">
                  {user.major} · {user.maskedStudentNumber}
                </span>
              </button>
            </form>
          ))}
        </div>
      </details>
    </section>
  );
}
