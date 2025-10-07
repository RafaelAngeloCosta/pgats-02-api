const request = require('supertest')
require('dotenv').config()

//GET /transfers
async function getTransfers(authToken) {
    return await request(process.env.BASE_URL)
        .get('/transfers')
        .set('Authorization', `Bearer ${authToken}`)
}

//POST /transfers
async function makeTransfers(payload, authToken) {
    
    return await request(process.env.BASE_URL)
        .post('/transfers')
        .set('Authorization', `Bearer ${authToken}`)
        .send(payload)

}


module.exports = {
    getTransfers,
    makeTransfers
}