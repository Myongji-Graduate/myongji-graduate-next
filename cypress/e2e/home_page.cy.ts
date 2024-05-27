describe('The Home Page', () => {
  it('successfully loads', () => {
    //   cy.visit('/')

    cy.login('admin', 'admin');
  });

  it('critical path', () => {
    // 1. 메인 -> 로그인 -> 마이 페이지
    cy.login('admin', 'admin');
    // 2. 마이 페이지 -> 결과 페이지

    //  마이페이지 → 결과페이지

    // 1
  });
});
