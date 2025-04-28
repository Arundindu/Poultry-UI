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

const get = (urlKey, showLoader = true, queryParams) => {
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
  console.log(axios.get(url, config))
  return axios.get(url, config);
};

const post = async(urlKey, params, showLoader = true, cancelToken = undefined) => {
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
  console.log(payLoad,signedToken)
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
  fetch(`/Assets/json/${url}.json`
    , {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
  )
    .then(function (response) {
      return response.json();
    })
  // .then(function (myJson) {
  //   console.log(myJson);
  //   setData(myJson)
  // });
}

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
    },
    {
      "athlete": "Natalie Coughlin",
      "age": 25,
      "country": "United States",
      "year": 2008,
      "date": "24/08/2008",
      "sport": "Swimming",
      "gold": 1,
      "silver": 2,
      "bronze": 3,
      "total": 6
    },
    {
      "athlete": "Aleksey Nemov",
      "age": 24,
      "country": "Russia",
      "year": 2000,
      "date": "01/10/2000",
      "sport": "Gymnastics",
      "gold": 2,
      "silver": 1,
      "bronze": 3,
      "total": 6
    },
    {
      "athlete": "Alicia Coutts",
      "age": 24,
      "country": "Australia",
      "year": 2012,
      "date": "12/08/2012",
      "sport": "Swimming",
      "gold": 1,
      "silver": 3,
      "bronze": 1,
      "total": 5
    },
    {
      "athlete": "Missy Franklin",
      "age": 17,
      "country": "United States",
      "year": 2012,
      "date": "12/08/2012",
      "sport": "Swimming",
      "gold": 4,
      "silver": 0,
      "bronze": 1,
      "total": 5
    },
    {
      "athlete": "Ryan Lochte",
      "age": 27,
      "country": "United States",
      "year": 2012,
      "date": "12/08/2012",
      "sport": "Swimming",
      "gold": 2,
      "silver": 2,
      "bronze": 1,
      "total": 5
    },
    {
      "athlete": "Allison Schmitt",
      "age": 22,
      "country": "United States",
      "year": 2012,
      "date": "12/08/2012",
      "sport": "Swimming",
      "gold": 3,
      "silver": 1,
      "bronze": 1,
      "total": 5
    },
    {
      "athlete": "Natalie Coughlin",
      "age": 21,
      "country": "United States",
      "year": 2004,
      "date": "29/08/2004",
      "sport": "Swimming",
      "gold": 2,
      "silver": 2,
      "bronze": 1,
      "total": 5
    },
    {
      "athlete": "Ian Thorpe",
      "age": 17,
      "country": "Australia",
      "year": 2000,
      "date": "01/10/2000",
      "sport": "Swimming",
      "gold": 3,
      "silver": 2,
      "bronze": 0,
      "total": 5
    },
    {
      "athlete": "Dara Torres",
      "age": 33,
      "country": "United States",
      "year": 2000,
      "date": "01/10/2000",
      "sport": "Swimming",
      "gold": 2,
      "silver": 0,
      "bronze": 3,
      "total": 5
    },
    {
      "athlete": "Cindy Klassen",
      "age": 26,
      "country": "Canada",
      "year": 2006,
      "date": "26/02/2006",
      "sport": "Speed Skating",
      "gold": 1,
      "silver": 2,
      "bronze": 2,
      "total": 5
    },
    {
      "athlete": "Nastia Liukin",
      "age": 18,
      "country": "United States",
      "year": 2008,
      "date": "24/08/2008",
      "sport": "Gymnastics",
      "gold": 1,
      "silver": 3,
      "bronze": 1,
      "total": 5
    },
    {
      "athlete": "Marit Bjørgen",
      "age": 29,
      "country": "Norway",
      "year": 2010,
      "date": "28/02/2010",
      "sport": "Cross Country Skiing",
      "gold": 3,
      "silver": 1,
      "bronze": 1,
      "total": 5
    },
    {
      "athlete": "Sun Yang",
      "age": 20,
      "country": "China",
      "year": 2012,
      "date": "12/08/2012",
      "sport": "Swimming",
      "gold": 2,
      "silver": 1,
      "bronze": 1,
      "total": 4
    },
    {
      "athlete": "Kirsty Coventry",
      "age": 24,
      "country": "Zimbabwe",
      "year": 2008,
      "date": "24/08/2008",
      "sport": "Swimming",
      "gold": 1,
      "silver": 3,
      "bronze": 0,
      "total": 4
    },
    {
      "athlete": "Libby Lenton-Trickett",
      "age": 23,
      "country": "Australia",
      "year": 2008,
      "date": "24/08/2008",
      "sport": "Swimming",
      "gold": 2,
      "silver": 1,
      "bronze": 1,
      "total": 4
    },
    {
      "athlete": "Ryan Lochte",
      "age": 24,
      "country": "United States",
      "year": 2008,
      "date": "24/08/2008",
      "sport": "Swimming",
      "gold": 2,
      "silver": 0,
      "bronze": 2,
      "total": 4
    },
    {
      "athlete": "Inge de Bruijn",
      "age": 30,
      "country": "Netherlands",
      "year": 2004,
      "date": "29/08/2004",
      "sport": "Swimming",
      "gold": 1,
      "silver": 1,
      "bronze": 2,
      "total": 4
    },
    {
      "athlete": "Petria Thomas",
      "age": 28,
      "country": "Australia",
      "year": 2004,
      "date": "29/08/2004",
      "sport": "Swimming",
      "gold": 3,
      "silver": 1,
      "bronze": 0,
      "total": 4
    },
    {
      "athlete": "Ian Thorpe",
      "age": 21,
      "country": "Australia",
      "year": 2004,
      "date": "29/08/2004",
      "sport": "Swimming",
      "gold": 2,
      "silver": 1,
      "bronze": 1,
      "total": 4
    },
    {
      "athlete": "Inge de Bruijn",
      "age": 27,
      "country": "Netherlands",
      "year": 2000,
      "date": "01/10/2000",
      "sport": "Swimming",
      "gold": 3,
      "silver": 1,
      "bronze": 0,
      "total": 4
    },
    {
      "athlete": "Gary Hall Jr.",
      "age": 25,
      "country": "United States",
      "year": 2000,
      "date": "01/10/2000",
      "sport": "Swimming",
      "gold": 2,
      "silver": 1,
      "bronze": 1,
      "total": 4
    },
    {
      "athlete": "Michael Klim",
      "age": 23,
      "country": "Australia",
      "year": 2000,
      "date": "01/10/2000",
      "sport": "Swimming",
      "gold": 2,
      "silver": 2,
      "bronze": 0,
      "total": 4
    },
    {
      "athlete": "Susie O'Neill",
      "age": 27,
      "country": "Australia",
      "year": 2000,
      "date": "01/10/2000",
      "sport": "Swimming",
      "gold": 1,
      "silver": 3,
      "bronze": 0,
      "total": 4
    },
    {
      "athlete": "Jenny Thompson",
      "age": 27,
      "country": "United States",
      "year": 2000,
      "date": "01/10/2000",
      "sport": "Swimming",
      "gold": 3,
      "silver": 0,
      "bronze": 1,
      "total": 4
    },
    {
      "athlete": "Pieter van den Hoogenband",
      "age": 22,
      "country": "Netherlands",
      "year": 2000,
      "date": "01/10/2000",
      "sport": "Swimming",
      "gold": 2,
      "silver": 0,
      "bronze": 2,
      "total": 4
    },
    {
      "athlete": "An Hyeon-Su",
      "age": 20,
      "country": "South Korea",
      "year": 2006,
      "date": "26/02/2006",
      "sport": "Short-Track Speed Skating",
      "gold": 3,
      "silver": 0,
      "bronze": 1,
      "total": 4
    },
    {
      "athlete": "Aliya Mustafina",
      "age": 17,
      "country": "Russia",
      "year": 2012,
      "date": "12/08/2012",
      "sport": "Gymnastics",
      "gold": 1,
      "silver": 1,
      "bronze": 2,
      "total": 4
    },
    {
      "athlete": "Shawn Johnson",
      "age": 16,
      "country": "United States",
      "year": 2008,
      "date": "24/08/2008",
      "sport": "Gymnastics",
      "gold": 1,
      "silver": 3,
      "bronze": 0,
      "total": 4
    },
    {
      "athlete": "Dmitry Sautin",
      "age": 26,
      "country": "Russia",
      "year": 2000,
      "date": "01/10/2000",
      "sport": "Diving",
      "gold": 1,
      "silver": 1,
      "bronze": 2,
      "total": 4
    },
    {
      "athlete": "Leontien Zijlaard-van Moorsel",
      "age": 30,
      "country": "Netherlands",
      "year": 2000,
      "date": "01/10/2000",
      "sport": "Cycling",
      "gold": 3,
      "silver": 1,
      "bronze": 0,
      "total": 4
    },
    {
      "athlete": "Petter Northug Jr.",
      "age": 24,
      "country": "Norway",
      "year": 2010,
      "date": "28/02/2010",
      "sport": "Cross Country Skiing",
      "gold": 2,
      "silver": 1,
      "bronze": 1,
      "total": 4
    },
    {
      "athlete": "Ole Einar Bjørndalen",
      "age": 28,
      "country": "Norway",
      "year": 2002,
      "date": "24/02/2002",
      "sport": "Biathlon",
      "gold": 4,
      "silver": 0,
      "bronze": 0,
      "total": 4
    },
    {
      "athlete": "Janica Kostelic",
      "age": 20,
      "country": "Croatia",
      "year": 2002,
      "date": "24/02/2002",
      "sport": "Alpine Skiing",
      "gold": 3,
      "silver": 1,
      "bronze": 0,
      "total": 4
    },
    {
      "athlete": "Nathan Adrian",
      "age": 23,
      "country": "United States",
      "year": 2012,
      "date": "12/08/2012",
      "sport": "Swimming",
      "gold": 2,
      "silver": 1,
      "bronze": 0,
      "total": 3
    },
    {
      "athlete": "Yannick Agnel",
      "age": 20,
      "country": "France",
      "year": 2012,
      "date": "12/08/2012",
      "sport": "Swimming",
      "gold": 2,
      "silver": 1,
      "bronze": 0,
      "total": 3
    },
    {
      "athlete": "Brittany Elmslie",
      "age": 18,
      "country": "Australia",
      "year": 2012,
      "date": "12/08/2012",
      "sport": "Swimming",
      "gold": 1,
      "silver": 2,
      "bronze": 0,
      "total": 3
    },
    {
      "athlete": "Matt Grevers",
      "age": 27,
      "country": "United States",
      "year": 2012,
      "date": "12/08/2012",
      "sport": "Swimming",
      "gold": 2,
      "silver": 1,
      "bronze": 0,
      "total": 3
    },
    {
      "athlete": "Ryosuke Irie",
      "age": 22,
      "country": "Japan",
      "year": 2012,
      "date": "12/08/2012",
      "sport": "Swimming",
      "gold": 0,
      "silver": 2,
      "bronze": 1,
      "total": 3
    },
    {
      "athlete": "Cullen Jones",
      "age": 28,
      "country": "United States",
      "year": 2012,
      "date": "12/08/2012",
      "sport": "Swimming",
      "gold": 1,
      "silver": 2,
      "bronze": 0,
      "total": 3
    },
    {
      "athlete": "Ranomi Kromowidjojo",
      "age": 21,
      "country": "Netherlands",
      "year": 2012,
      "date": "12/08/2012",
      "sport": "Swimming",
      "gold": 2,
      "silver": 1,
      "bronze": 0,
      "total": 3
    },
    {
      "athlete": "Camille Muffat",
      "age": 22,
      "country": "France",
      "year": 2012,
      "date": "12/08/2012",
      "sport": "Swimming",
      "gold": 1,
      "silver": 1,
      "bronze": 1,
      "total": 3
    },
    {
      "athlete": "Mel Schlanger",
      "age": 25,
      "country": "Australia",
      "year": 2012,
      "date": "12/08/2012",
      "sport": "Swimming",
      "gold": 1,
      "silver": 2,
      "bronze": 0,
      "total": 3
    },
    {
      "athlete": "Emily Seebohm",
      "age": 20,
      "country": "Australia",
      "year": 2012,
      "date": "12/08/2012",
      "sport": "Swimming",
      "gold": 1,
      "silver": 2,
      "bronze": 0,
      "total": 3
    },
    {
      "athlete": "Rebecca Soni",
      "age": 25,
      "country": "United States",
      "year": 2012,
      "date": "12/08/2012",
      "sport": "Swimming",
      "gold": 2,
      "silver": 1,
      "bronze": 0,
      "total": 3
    },
    {
      "athlete": "Satomi Suzuki",
      "age": 21,
      "country": "Japan",
      "year": 2012,
      "date": "12/08/2012",
      "sport": "Swimming",
      "gold": 0,
      "silver": 1,
      "bronze": 2,
      "total": 3
    },
    {
      "athlete": "Dana Vollmer",
      "age": 24,
      "country": "United States",
      "year": 2012,
      "date": "12/08/2012",
      "sport": "Swimming",
      "gold": 3,
      "silver": 0,
      "bronze": 0,
      "total": 3
    },
    {
      "athlete": "Alain Bernard",
      "age": 25,
      "country": "France",
      "year": 2008,
      "date": "24/08/2008",
      "sport": "Swimming",
      "gold": 1,
      "silver": 1,
      "bronze": 1,
      "total": 3
    },
    {
      "athlete": "László Cseh Jr.",
      "age": 22,
      "country": "Hungary",
      "year": 2008,
      "date": "24/08/2008",
      "sport": "Swimming",
      "gold": 0,
      "silver": 3,
      "bronze": 0,
      "total": 3
    },
    {
      "athlete": "Matt Grevers",
      "age": 23,
      "country": "United States",
      "year": 2008,
      "date": "24/08/2008",
      "sport": "Swimming",
      "gold": 2,
      "silver": 1,
      "bronze": 0,
      "total": 3
    },
    {
      "athlete": "Margaret Hoelzer",
      "age": 25,
      "country": "United States",
      "year": 2008,
      "date": "24/08/2008",
      "sport": "Swimming",
      "gold": 0,
      "silver": 2,
      "bronze": 1,
      "total": 3
    },
    {
      "athlete": "Katie Hoff",
      "age": 19,
      "country": "United States",
      "year": 2008,
      "date": "24/08/2008",
      "sport": "Swimming",
      "gold": 0,
      "silver": 1,
      "bronze": 2,
      "total": 3
    },
    {
      "athlete": "Leisel Jones",
      "age": 22,
      "country": "Australia",
      "year": 2008,
      "date": "24/08/2008",
      "sport": "Swimming",
      "gold": 2,
      "silver": 1,
      "bronze": 0,
      "total": 3
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