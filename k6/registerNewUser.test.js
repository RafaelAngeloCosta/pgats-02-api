import http from 'k6/http';
import { check, sleep } from 'k6';
const postRegister = JSON.parse(open('../fixtures/postRegister.json'));

export const options = {
    stages: [
        { duration: '20s', target: 10 },
        { duration: '40s', target: 10 },
        { duration: '20s', target: 0 }
    ],
    thresholds: {
        http_req_failed: ['rate<0.01']
    },
};

export default function() {
    const url = 'http://localhost:3000/users/register';

    const username = `user_VU_${__VU}_${Date.now()}`;

    const bodyRegister = { ...postRegister };
    bodyRegister.username = username;

    const payload = JSON.stringify(bodyRegister);

    const params = {
        headers: { 
            'Content-Type': 'application/json', 
        }
    };

    const res = http.post(url, payload, params);

    check(res, {
        'status é 201': (r) => r.status === 201,
    });

    console.log(`Usuário criado: ${username} | status: ${res.status}`);

    sleep(1);
}