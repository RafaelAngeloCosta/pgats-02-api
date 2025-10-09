// k6/obter-transferencias.test.js

import http from 'k6/http';
import { sleep, check, group } from 'k6';
import { token } from '../helpers/tokenUser.js';
import { pegarBaseURL } from '../utils/variaveis.js';

export const options = {
  iterations: 1, 
};

export default function () {
  const baseURL = pegarBaseURL();
  const url = `${baseURL}/transfers`;

  group('GET /transfers - Sucesso com token válido', function () {
    const obteroken = token(); // Pega um token válido

    const params = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${obteroken}`,
      },
    };

    const res = http.get(url, params);
    
    console.log(`[SUCESSO 200] GET /transfers status=${res.status}`);
    console.log(`[SUCESSO 200] GET /transfers body=${res.body}`);

    check(res, {
      'Status deve ser 200 (OK)': (r) => r.status === 200,
      'Corpo da resposta não deve ser vazio': (r) => r.body.length > 0,
    });
  });

  group('GET /transfers - Falha sem token', function () {
    const params = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    const res = http.get(url, params);

    console.log(`[FALHA 401] GET /transfers status=${res.status}`);

    check(res, {
      'Status deve ser 401 (Unauthorized)': (r) => r.status === 401,
    });
  });

  sleep(1);
}