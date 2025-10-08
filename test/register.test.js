const request = require('supertest');
const { expect } = require('chai');

require('dotenv').config();

describe('Users', () => {
    describe('POST /register', () => {
        it('Deve retornar sucesso com 201 - Usuário Criado - quando informo valores válidos para registro de novo usuário', async () => {
            const response = await request(process.env.BASE_URL)
                .post('/users/register')
                .set('Content-Type', 'application/json')
                .send({
                    username: "alice.almeida",
                    password: "123456",
                    favorecidos: [
                        ""
                    ]
                })

            expect(response.status).to.equal(201);
            expect(response.body.username).to.equal('alice.almeida');
            expect(response.body.favorecidos).to.be.an('array');
            expect(response.body.favorecidos).to.deep.equal(['']);
        })
    })
})