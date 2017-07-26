/**
 * Created by sojharo on 26/07/2017.
 */

import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import auth from './auth.service';

export const API_URL = '/api';

export default function callApi(endpoint, method = 'get', body) {

  var headers = {
    'content-type': 'application/json'
  };

  if (auth.loggedIn()) {
    headers = _.merge(headers, {
      'Authorization': `Bearer ${auth.getToken()}`,
    });
  }

  return fetch(`${API_URL}/${endpoint}`, {
    headers,
    method,
    body: JSON.stringify(body),
  }).then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
    .then(
      response => response,
      error => error
    );
}