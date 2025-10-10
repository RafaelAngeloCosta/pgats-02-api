import http from 'k6/http';
import { sleep, check, group } from 'k6';
import { token } from '../helpers/tokenUser.js';
import { pegarBaseURL } from '../utils/variaveis.js';

export const options = {
    vus: 5,
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(95)<200'],
        http_req_failed: ['rate<0.01']
    }
};

export default function () {
  const baseURL = pegarBaseURL();
  const url = `${baseURL}/users`;

    group('GET /users - Sucesso com token válido', function () {
    const obteroken = token(); // Pega um token válido

    const params = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${obteroken}`,
      },
    };

    const res = http.get(url, params);
    
    console.log(`[SUCESSO 200] GET /users status=${res.status}`);
    console.log(`[SUCESSO 200] GET /users body=${res.body}`);

    check(res, {
        'Validar que o status é 200': (r) => r.status ===200,
        'Validar que a resposta é um array': (r) => Array.isArray(r.json()), 
        'Validar que a lista não está vazia': (r) => r.json() && r.json().length > 0,

    });
  });

  group('GET /users - Falha sem token', function () {
    const params = {
      headers: {
        'Content-Type': 'application/json',
      },

    };

  });

  sleep(1);
}