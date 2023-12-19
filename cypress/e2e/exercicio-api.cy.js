/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contract'
import { faker } from '@faker-js/faker'

describe('Testes da Funcionalidade Usuários', () => {
     let token
     before(() => {
          cy.token('pedropivato@ebac.com.br', 'teste').then(tkn => { token = tkn })
     });

     it('Deve validar contrato de usuários', () => {
          cy.request('usuarios').then(response => {
               return contrato.validateAsync(response.body)
          })
     });

     it('Deve listar usuários cadastrados', () => {
          cy.request({
               method: 'GET',
               url: 'usuarios'
          }).then((response) => {
               expect(response.body.usuarios[7].nome).to.equal('Pedro Pivato')
               expect(response.status).to.equal(200)
               expect(response.body).to.have.property('quantidade')
               expect(response.body).to.have.property('usuarios')
               expect(response.duration).to.be.lessThan(15)
          })
     });

     it('Deve cadastrar um usuário com sucesso', () => {
          let nomeFaker = faker.person.fullName()
          let emailFaker = faker.internet.email()
          let senhaFaker = faker.internet.password()
          cy.request({
               method: 'POST',
               url: 'usuarios',
               headers: { authorization: token },
               body: {
                    "nome": nomeFaker,
                    "email": emailFaker,
                    "password": senhaFaker,
                    "administrador": "true"
               },
          }).then((response) => {
               expect(response.status).to.equal(201)
               expect(response.body.message).to.equal('Cadastro realizado com sucesso')
          })
     });

     it('Deve validar um usuário com email inválido', () => {
          let nomeFaker = faker.person.fullName()
          let emailFaker = faker.internet.email()
          let senhaFaker = faker.internet.password()
          cy.request({
               method: 'POST',
               url: 'usuarios',
               headers: { authorization: token },
               body: {
                    "nome": nomeFaker,
                    "email": 'fulano@qa.com',
                    "password": senhaFaker,
                    "administrador": "true"
               },
               failOnStatusCode: false
          }).then((response) => {
               expect(response.status).to.equal(400)
               expect(response.body.message).to.equal('Este email já está sendo usado')

          })
     });

     it('Deve editar um usuário previamente cadastrado', () => {
          cy.request('usuarios').then(response => {
               let id = response.body.usuarios[0]._id
               cy.request({
                    method: 'PUT',
                    url: `usuarios/${id}`,
                    headers: { authorization: token },
                    body: {
                         "nome": "Fulano da silva",
                         "email": "fulanodasilva@qa.com.br",
                         "password": "teste12345",
                         "administrador": "true"
                    }
               }).then(response => {
                    expect(response.body.message).to.equal("Registro alterado com sucesso")
                    expect(response.status).to.equal(200)
               })
          })
     });

     it('Deve deletar um usuário previamente cadastrado', () => {
         let nomeFaker = faker.person.fullName()
         let emailFaker = faker.internet.email()
         let senhaFaker = faker.internet.password()
         cy.cadastrarUsuario (token, nomeFaker, emailFaker, senhaFaker)
         .then(response =>{
          let id = response.body._id
          cy.request({
               method: 'DELETE',
               url: `usuarios/${id}`,
               headers: {authorization: token}
          }).then (response =>{
               expect(response.body.message).to.equal("Registro excluído com sucesso")
               expect(response.status).to.equal(200)
          })
         })

     });
});


