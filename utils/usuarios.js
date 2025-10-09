const request = require('supertest')
require('dotenv').config()

//GET /users
async function getUsers(authToken) {
    return await request(process.env.BASE_URL)
        .get('/users')
        .set('Authorization', `Bearer ${authToken}`)
}


module.exports = {
    getUsers    
}