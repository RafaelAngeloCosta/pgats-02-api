const request = require('supertest')
const postLogin = require('../fixtures/postLogin.json')

const obterToken = async (usuario, senha) => {
    const bodyLogin = { ...postLogin}
    bodyLogin.username = usuario
    bodyLogin.password = senha

    const response = await request(process.env.BASE_URL)
        .post('/users/login')
        .set('Content-Type', 'application/json')
        .send({bodyLogin})

    console.log(response.body.token)
    return response.body.token
}

module.exports = {
    obterToken
}