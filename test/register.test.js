const request = require('supertest');
const { expect } = require('chai');
const { generateUniqueUsername } = require('../helpers/newUsers');
const postRegister = require('../fixtures/postRegister.json');

require('dotenv').config();

describe('Users', () => {
    describe('POST /register', () => {
        it('Deve retornar sucesso com 201 - Usuário Criado - quando informo valores válidos para registro de novo usuário', async () => {
            const bodyRegister = { ...postRegister };
            bodyRegister.username = generateUniqueUsername();

            const response = await request(process.env.BASE_URL)
                .post('/users/register')
                .set('Content-Type', 'application/json')
                .send(bodyRegister);
            
            expect(response.status).to.equal(201);
            expect(response.body.username).to.equal(bodyRegister.username);
            expect(response.body.favorecidos).to.be.an('array');
            expect(response.body.favorecidos).to.deep.equal(['']);
        })
    })
})