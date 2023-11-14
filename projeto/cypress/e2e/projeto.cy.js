/// <reference types = "cypress"/>
describe("Criando cenário de teste para o site IMDb", () => {

  it("Caso de teste: Preenchendo as informações para registrar a conta com informações válidas", () => {
    cy.visit("https://www.imdb.com/")
    cy.get('.nav__userMenu > .ipc-button--single-padding > .ipc-button__text').click()
    cy.get(':nth-child(4) > .list-group-item').click()
    let infos = criandoInformacao()
    cy.get('#ap_customer_name').type(infos[0])
    cy.get('#ap_email').type(infos[1])
    cy.get('#ap_password').type(infos[2])
    cy.get('#ap_password_check').type(infos[2])
    cy.get('#continue').click()
    cy.get('#cvf-aamation-challenge-iframe').should("be.visible")
  })

  it("Caso de teste: Registrando um usuário com falha (email já cadastrado)", () => {
    cy.visit("https://www.imdb.com/")
    cy.get('.nav__userMenu > .ipc-button--single-padding > .ipc-button__text').click()
    cy.get(':nth-child(4) > .list-group-item').click()
    let infos = criandoInformacao()
    cy.get('#ap_customer_name').type(infos[0])
    cy.get('#ap_email').type("sjoaoryan@gmail.com")
    cy.get('#ap_password').type(infos[2])
    cy.get('#ap_password_check').type(infos[2])
    cy.get('#continue').click()
    cy.get('.a-list-item').should('contain.text', 'an account already exists with the email address')
  })

  it("Caso de teste: Registrando um usuário com falha (senhas diferentes)", () => {
    cy.visit("https://www.imdb.com/")
    cy.get('.nav__userMenu > .ipc-button--single-padding > .ipc-button__text').click()
    cy.get(':nth-child(4) > .list-group-item').click()
    let infos = criandoInformacao()
    cy.get('#ap_customer_name').type(infos[0])
    cy.get('#ap_email').type(infos[1])
    cy.get('#ap_password').type(infos[2])
    cy.get('#ap_password_check').type(infos[2] + "diferente")
    cy.get('#continue').click()
    cy.get('.a-list-item').should('contain.text', 'Passwords must match')
  })

  it("Caso de teste: Buscando um título pelo nome", () => {
    cy.visit("https://www.imdb.com/")
    cy.get('#suggestion-search').type("Vikings{enter}")
    cy.get('.findHeader').should("contain.text", "Vikings")

  })

  it("Caso de teste: Verificando se na aba winners do oscar a obra vencedora da modalidade está com o emblema de Winner)", () => {
    cy.visit("https://www.imdb.com/")
    cy.get('#imdbHeader-navDrawerOpen').click()
    cy.get(':nth-child(3) > .navlinkcat__targetWrapper > [data-testid="category-expando"]').click()
    cy.get('[href="/oscars/?ref_=nv_ev_acd"] > .ipc-list-item__text').click()
    cy.get('.nav > :nth-child(2) > a > :nth-child(1)').click()
    cy.get(':nth-child(1) > .event-widgets__award-category-nominations > :nth-child(1) > :nth-child(1) > .event-widgets__nomination-details > .event-widgets__winner-badge').should("have.text", "Winner")
  })

  it("Caso de teste: Buscando filmes do gênero ação", () => {
    cy.visit("https://www.imdb.com/")
    cy.get('#imdbHeader-navDrawerOpen').click()
    cy.get('.sc-cb2ab421-0 > :nth-child(1) > .navlinkcat__targetWrapper > [data-testid="category-expando"] > .navlinkcat__itemChevron > #iconContext-chevron-right').click()
    cy.get('[href="/feature/genre/?ref_=nv_ch_gr"] > .ipc-list-item__text').click()
    cy.get(':nth-child(13) > .ab_widget > .ab_links > .widget_content > .widget_nested > :nth-child(1) > :nth-child(1) > .full-table > :nth-child(1) > .table-cell > a').click()
    cy.get('.article > .header').should("contain.text", "Action")
  })



})

function criandoInformacao() {

  let horas = new Date().getHours().toString()
  let minutos = new Date().getMinutes().toString()
  let seg = new Date().getSeconds().toString()
  let nome = 'teste' + minutos + seg
  let email = horas + minutos + seg + 'test' + '@gmail.com'
  let senha = horas + minutos + seg + 'senha'
  let userInfo = [nome, email, senha]
  return userInfo
}