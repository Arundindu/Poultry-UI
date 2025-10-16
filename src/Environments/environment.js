export const ENVIRONMENTS = {
  localhost: {
    baseurl: '',
  },
  dev: {
    // baseurl: 'http://192.168.1.26:40109/userManagement/',
    baseurl: 'https://poultry-be-oy5n.onrender.com/userManagement/',
    // baseurl: 'http://192.168.1.141:40109/userManagement/',
    // baseurl: '/kl_one_it/',
  },
  prod: {
    // baseurl: 'http://192.168.3.171:5000/api/v1.0/audit_lens/',
    baseurl: '/kl_one_it/',
  },
};

export const DEPLOYED_ENVIRONMENT = 'dev';
// export const DEPLOYED_ENVIRONMENT = 'dev';
export const BASE_PATH = '';
// export const BASE_PATH = 'kl_one_it_services';