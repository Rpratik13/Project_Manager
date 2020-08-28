import * as config from "../configs/appconfig";

export function get(endpoint) {
  return fetch(`${config.BASE_URL}${endpoint}`, {
    method : 'GET',
    headers: {
      'authentication' : window.localStorage.getItem('token')
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

export function post(endpoint, body) {
  return fetch(`${config.BASE_URL}${endpoint}`, {
    method : 'POST',
    headers: {
      'authentication' : window.localStorage.getItem('token'),
      'content-type' : 'application/json'
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
}