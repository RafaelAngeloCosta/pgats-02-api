const { expect } = require('chai')
const { obterToken } = require('../helpers/autenticacao')
const {makeTransfers} = require('../utils/transferencia')


require('dotenv').config()

describe('Realizar transferência', () => {
    describe('POST /transfers', () => {

        let token

        const getBasePayLoad = () => ({
            from: "julio",
            to: "priscila",
            value: 100
        })

        before(async () => {
            token = await obterToken('julio', '123456')
        })


        it('Deve retornar 201 quando a transferência for realizada', async () => {
            const payload = getBasePayLoad()

            const response = await makeTransfers(payload, token)

            expect(response.status).to.equal(201)
        })

        it('Deve retornar 400 quando a erro de validação ou regra de negócio', async () => {
            const payload ={ ...getBasePayLoad(), from: "joao" } //alterando só o campo necessário
            const response = await makeTransfers(payload, token)

            expect(response.status).to.equal(400)
        })

        it('Deve retornar 401 quando o Token não fornecido', async () => {

            const payload = getBasePayLoad()
            const response = await makeTransfers(payload, '')

            expect(response.status).to.equal(401)

        })

        it('Deve retornar 401 quando o Token é inválido', async () => {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imp1bGlvIiwiaWF0IjoxNzU5NzkzNzA5LCJleHAiOjE3NTk3OTczMDl9.IMRF956vqqndA8a0sFuJ9ImrAOlSoXRN34q8XuFNC7a'
            const payload = getBasePayLoad()
            const response = await makeTransfers(payload, token)

            expect(response.status).to.equal(401)

        })

    })
})