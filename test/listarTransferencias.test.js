const request = require('supertest')
const { expect } = require('chai')
const { obterToken } = require('../helpers/autenticacao')
const { getTransfers } = require('../utils/transferencia')

require('dotenv').config()

describe('Listar Transferência', () => {
    describe('GET /transfers', () => {

        let token

        before(async () => {
            token = await obterToken('julio', '123456')
        })

        it('Deve retornar 200 e a lista de transferências', async () => {
            const response = await getTransfers(token)

            expect(response.status).to.equal(200)
        })

        it('Deve retornar 401 Token não fornecido', async () => {
            const response = await getTransfers('')

            expect(response.status).to.equal(401)
        })

        it('Deve retornar 401 Token inválido', async () => {
            const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imp1bGlvIiwiaWF0IjoxNzU5Nzg2OTY2LCJleHAiOjE3NTk3OTA1NjZ9.YyasFie4wjByghgCMxcIdHkXf4JPyojYYRZW1LgYO4a'
            const response = await request(process.env.BASE_URL)
                .get('/transfers')
                .set('Authorization', token)

            expect(response.status).to.equal(401)
        })

    })
})