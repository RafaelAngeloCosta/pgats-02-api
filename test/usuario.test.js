const request = require('supertest');
const { expect } = require('chai');
const { obterToken } = require('../helpers/autenticacao');
const { getUsers } = require('../utils/usuarios')

require('dotenv').config()

describe('Listar Usuários', () => {
    describe('GET /users', () => {

        let token
        before(async () => {
            token = await obterToken('julio', '123456')
        })

        it('Deve  sucesso com 200 e a lista de usuários', async () => {
            const resposta = await getUsers(token)
            
            expect(resposta.status).to.equal(200)
        })

     

    })
})