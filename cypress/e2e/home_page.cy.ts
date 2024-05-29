describe('The Home Page', () => {
  it('a', () => {
    cy.login('admin', 'admin');
    cy.visit('/my');
    //  마이페이지 → 결과페이지
    // cy.dataCy('result-page-link').click();
  });

  it('critical path', () => {
    // 1. 메인 -> 로그인 -> 마이 페이지
    // 2. 마이 페이지 -> 결과 페이지
    cy.login('admin', 'admin');
    cy.visit('/my');
    //  마이페이지 → 결과페이지
    cy.dataCy('result-page-link').click();

    // 1
  });
});
