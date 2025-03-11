const servicesDomain = "https://one-it.knowledgelens.com/"
const proxies = {
  kl_one_it_services: servicesDomain + "kl_one_it_services/"
}

export const API_ENDPOINTS = {
  "addUser": "addUser",
  "userLogin": "login",
  "activateUser": "activateUser",
  "deActivateUser": "deActivateUser",
  "deleteUser": "deleteUser",
  'addSettingTab': "addSettingTab",
  'fetchSettingTabData': 'fetchSettingTabData',
  'tabJsonData': "fetchTabHeaderData",
  'birdsPriceData': "birdsPriceData",
  'birdsPriceTableData': "birdsPriceTableData",
  'hensAvailabilityData': "hensAvailabilityData",
  'shedsData': "shedsData",
  'shedsTableData': "shedsTableData",
  'feedConsumptionData': "feedConsumptionData",
  'feedConsumptionTableData': "feedConsumptionTableData",
  'userSetupData': "userSetupData",
  'userSetupTableData': 'userSetupTableData',
  'salesData': 'salesData',
  'salesTableData': "salesTableData",
  'orderHensData': "orderHensData",
  'orderHensTableData': "orderHensTableData",
  'chickPriceData': "chickPriceData",
  'chickPriceTableData': "chickPriceTableData",
  'mortalityData': 'mortalityData',
  'mortalityTableData': 'mortalityTableData',
  'diseasesData': 'diseasesData',
  'diseasesTableData': 'diseasesTableData',
  'diseasesList': 'diseasesList',
  'deleteSettingsTabDetails': 'deleteSettingsTabDetails',
  'downloadAssetPreview': 'downloadAssetPreview',
  'assetBulkInsert': 'AssetBulkInsert',
  'assetUsers': 'AssetUsers',
  'viewCheckList': 'ViewCheckList',
  'checkOutAssets': 'CheckOutAssets'
};

export const API_ENVIRONMENT = {
  'addUser':'dev',
  'userLogin': 'dev',
  'activateUser': 'dev',
  'deActivateUser': 'dev',
  'deleteUser': 'dev',
  'addSettingTab': 'dev',
  'fetchSettingTabData': 'dev',
  'tabJsonData': "dev",
  "birdsPriceData": "dev",
  "birdsPriceTableData": "dev",
  "hensAvailabilityData": "dev",
  'shedsData': "dev",
  "shedsTableData": "dev",
  'feedConsumptionData': 'dev',
  'feedConsumptionTableData': 'dev',
  'userSetupData': 'dev',
  'userSetupTableData': 'dev',
  'salesData': 'dev',
  'salesTableData': 'dev',
  'orderHensData': 'dev',
  'orderHensTableData': 'dev',
  'chickPriceData': 'dev',
  'chickPriceTableData': 'dev',
  'mortalityData': 'dev',
  'mortalityTableData': 'dev',
  'diseasesData': 'dev',
  'diseasesTableData': 'dev',
  'diseasesList': 'dev',
  'deleteSettingsTabDetails': 'dev',
  'viewCheckList': 'dev',
  'checkOutAssets': 'dev'
};

export const MESSAGES = {
  server_error: 'The system is currently down due to maintenance. Please try again later.',
  download_url_fail: 'The download action is experiencing some technical difficulties. Please try again in some time',
  filter_no_data: 'No records present for the selected filters',
  table_no_data: 'No records found',
  invalidToken: 'Invalid token. Please login to continue',
  error_500: 'Internal Server Error',
};

export const VARIABLES = {
  userSession: 'kl-user',
  accessToken: 'tokenId',
  userName: 'name',
  fullName: 'full_name',
  firstName: 'first_name',
  lastName: 'last_name',
  photo: 'photo',
  empId: 'emp_id',
  email: 'email',
  userRole: 'userRole',
  menuToggle: 'menu-toggle',
};
export const CONSTANTS = {
  roleAdmin: 'admin',
  roleAuditor: 'auditor',
  roleAudited: 'auditee',
  roleSuperAdmin: "superadmin",
  timeZones: ["IST", "PST", "EST"],
  organization: ['Knowledge Lens', 'GLens', 'Unify Twin'],
  allocation: [100, 90, 80, 70, 60, 50, 40, 30, 20, 10],
  tablePageSize: [10, 25, 50, 100, 200, 500],
};
export const TOASTER_TIMEOUT = 3000;