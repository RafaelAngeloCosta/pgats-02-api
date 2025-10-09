// k6/transferencia.test.js

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

  group('POST /transfers - Sucesso (201 Created)', function () {
    const obteroken = token(); // Pega um token válido

    const payloadValido = JSON.stringify({
      from: "julio",
      to: "priscila",
      value: 100
    });

    const params = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${obteroken}`
      },
    };

    const res = http.post(url, payloadValido, params);
    
    console.log(`[SUCESSO 201] POST /transfers status=${res.status}`);
    console.log(`[SUCESSO 201] POST /transfers body=${res.body}`);

    check(res, {
      'Status deve ser 201 (Created)': (r) => r.status === 201,
    });
  });

  group('POST /transfers - Falha por dados inválidos (400 Bad Request)', function () {
    const obteroken = token(); 

    const payloadInvalido = JSON.stringify({
      from: "julio",
      to: "priscila"
      // 'value' está faltando propositalmente
    });

    const params = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${obteroken}` // Token é válido
      },
    };

    const res = http.post(url, payloadInvalido, params);

    console.log(`[FALHA 400] POST /transfers status=${res.status}`);

    check(res, {
      'Status deve ser 400 (Bad Request)': (r) => r.status === 400,
    });
  });

  group('POST /transfers - Falha por falta de token (401 Unauthorized)', function () {
    const payloadValido = JSON.stringify({
      from: "julio",
      to: "priscila",
      value: 100
    });

    const params = {
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization' header está faltando propositalmente
      },
    };

    const res = http.post(url, payloadValido, params);
    
    console.log(`[FALHA 401] POST /transfers status=${res.status}`);

    check(res, {
      'Status deve ser 401 (Unauthorized)': (r) => r.status === 401,
    });
  });

  sleep(1);
}