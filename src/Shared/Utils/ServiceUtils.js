import { API_ENDPOINTS, API_ENVIRONMENT, MESSAGES } from "../../Environments/config";
import {
  BASE_PATH,
  DEPLOYED_ENVIRONMENT,
  ENVIRONMENTS,
} from "../../Environments/environment";
import axios from "axios";
import { loaderService } from "./Loader/Loader";
import Toaster from "./Toaster";
import { BehaviorSubject } from "rxjs";
import { sessionService } from "./SessionService";
import * as CryptoJS from 'crypto-js';
import jwtDecode from "jwt-decode";

const loaderSubject = new BehaviorSubject();

axios.interceptors.request.use((request) => {
  const loader = loaderSubject.getValue();
  if (loader) loaderService.showLoader();
  return request;
});
axios.interceptors.response.use(
  (response) => {
    const loader = loaderSubject.getValue();
    if (loader) loaderService.hideLoader();
    return response || {};
  },
  ({ response }) => {
    // Error
    const loader = loaderSubject.getValue();
    if (loader) loaderService.hideLoader();
    // if (response?.status === 500) {
    //   Toaster.error({ title: 'Internal Server Error', message: response?.data?.Error || '' });
    //   console.log('Error 500', response?.config?.url?.split('klapps')?.[1], response?.data);
    // } else
    if (response?.status === 401 || !response) {
      Toaster.error(MESSAGES.invalidToken);
      const path = window.location.href.split("#");
      // sessionService.setSession({ssoAutoLoad: true, redirectUrl: path[1]}, 'sso-redirect');
      // window.location.href = path[0] + "#/logout";
    } else {
      console.error(
        "ERROR " + response?.status + ":",
        response?.config?.url?.split("klapps")?.[1],
        response?.data
      );
    }
    return response || {};
  }
);

const get = async(urlKey, showLoader = true, queryParams) => {
  let url;
  const environment = API_ENVIRONMENT[urlKey] || DEPLOYED_ENVIRONMENT;
  if (environment === "local") {
    url = BASE_PATH + `/Assets/json/${urlKey}.json`;
  } else {
    url = ENVIRONMENTS[environment].baseurl + API_ENDPOINTS[urlKey];
    if (queryParams) {
      url = url + '?' + queryParams;
    }
  }
  loaderSubject.next(showLoader);

  // const userSession = sessionService.getSession();
  const config = {
    headers: {
      // token: userSession?.[VARIABLES.accessToken],
      "Access-Control-Allow-Origin": "*",
    },
  };
  let response = await axios.get(url, config)
  return JSON.parse(window.atob(response.data))
};

const post = async (urlKey, params, showLoader = true, cancelToken = undefined) => {
  // const navigate = useNavigate();

  const environment = API_ENVIRONMENT[urlKey] || DEPLOYED_ENVIRONMENT;
  if (environment === "local") return get(urlKey);
  let url = ENVIRONMENTS[environment].baseurl + API_ENDPOINTS[urlKey];
  loaderSubject.next(showLoader);

  // const userSession = sessionService.getSession();
  const config = {
    headers: {
      // token: userSession?.[VARIABLES.accessToken],
      "Access-Control-Allow-Origin": "*",
    },
  };

  if (cancelToken !== undefined) {
    config.cancelToken = cancelToken;
  }
  const userData = sessionService.getSession('userDetails');
  if (userData) {
    const addToPayload = Object.keys(userData)
    if (params instanceof FormData) {
      addToPayload.map(element => {
        params.append(element, userData[element] || '')
      })
    } else if (urlKey !== 'userLogin') {
      params = { ...userData, ...params }
      // addToPayload.map(element => {
      //   params[element] = userData[element] || '';
      // })
    }
  }
  // Base64
  let payLoad = window.btoa(JSON.stringify(params))
  let response = await axios.post(url, payLoad)
  return JSON.parse(window.atob(response.data))
  // JWT
  // let payLoad = convertToJWT(params)
  // let response = await axios.post(url, payLoad)
  // return JSON.parse(window.atob(response.data))
};

const convertToJWT = (payLoad) => {
  const secretKey = "Run";
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };
  const stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
  const encodedHeader = base64url(stringifiedHeader);
  const stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(payLoad));
  const encodedData = base64url(stringifiedData);
  const token = encodedHeader + '.' + encodedData;
  let signature = CryptoJS.HmacSHA256(token, secretKey);
  signature = base64url(signature);
  const signedToken = token + '.' + signature;
  console.log(payLoad, signedToken)
  return window.btoa(JSON.stringify({ "data": signedToken }));
}

const base64url = (source) => {
  let encodedSource = CryptoJS.enc.Base64.stringify(source);
  encodedSource = encodedSource.replace(/=+$/, '');
  encodedSource = encodedSource.replace(/\+/g, '-');
  encodedSource = encodedSource.replace(/\//g, '_');
  return encodedSource;
}

const fetchLocalJSONS = (url) => {
  return fetch(`/Assets/Jsons/${url}.json`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then(response => {
    if (!response.ok) {
      Toaster.error(`Failed to fetch ${url}.json`)
    }
    return response.json();
  })
};

const fetchServerJSONS = (url, paginationMetaData) => {
  const reponseFormat = [
    {
      "athlete": "Michael Phelps",
      "age": 23,
      "country": "United States",
      "year": 2008,
      "date": "24/08/2008",
      "sport": "Swimming",
      "gold": 8,
      "silver": 0,
      "bronze": 0,
      "total": 8
    },
    {
      "athlete": "Michael Phelps",
      "age": 19,
      "country": "United States",
      "year": 2004,
      "date": "29/08/2004",
      "sport": "Swimming",
      "gold": 6,
      "silver": 0,
      "bronze": 2,
      "total": 8
    },
    {
      "athlete": "Michael Phelps",
      "age": 27,
      "country": "United States",
      "year": 2012,
      "date": "12/08/2012",
      "sport": "Swimming",
      "gold": 4,
      "silver": 2,
      "bronze": 0,
      "total": 6
    }
  ]


  const newReponse = {
    "paginationMetaData": paginationMetaData,
    "data": []
  }

  newReponse['paginationMetaData'].page = newReponse['paginationMetaData'].page + 1;

  const startIndex1 = (1 + ((paginationMetaData.page - 1) * paginationMetaData.count)) - 1
  const lastIndex = (paginationMetaData.page * paginationMetaData.count) - 1;

  for (let startIndex = startIndex1; startIndex <= lastIndex; startIndex++) {
    newReponse.data.push(reponseFormat[startIndex])
  }
  return newReponse;

}

const ServiceUtils = {
  getRequest: get,
  postRequest: post,
  localJSONS: fetchLocalJSONS,
  serveJSONS: fetchServerJSONS
};

export { ServiceUtils };