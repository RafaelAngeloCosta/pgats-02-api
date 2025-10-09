import http from 'k6/http'
const postLogin = JSON.parse(open('../fixtures/postLogin.json'))

export function token(){
    const url = 'http://localhost:3000/users/login'

    const payload = JSON.stringify(postLogin);

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const res = http.post(url, payload, params)
    return res.json('token')
}