
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
  'create-ticket': "CreateTicket",
  'update-ticket': 'UpdateTicket',
  'TicketList': "TicketList",
  'EditTicket': "EditTicket",
  'get-json': "getJson",
  'dashboard-view': "DashboardView",
  'UserManagement': "UserManagement",
  'getUsers': "getUsers",
  'listSidebar': "listSidebar",
  'list-category': "listCategory",
  'categoryManagement': 'Process_CategoryList_or_IssueList',
  'asset-dashboard': 'vendorJson',
  'list-assets': "ListAssets",
  'get_asset_json': "GetAssetJson",
  'asset-management': "AssetManagement",
  'show-asset': "ShowAsset",
  'asset-config': "AssetConfig",
  'asset-data': 'AssetData',
  'Chatbox': 'Chatbox',
  'listResolver': 'ListResolver',
  'ManageResolverGroup': 'ManageResolverGroup',
  'getResolver': 'getResolver',
  'downloadtickets': 'downloadtickets',
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
  'update-ticket': 'dev',
  'get-json': 'dev',
  'dashboard-view': "dev",
  "getUsers": "dev",
  "listUsers": "dev",
  'listSidebar': "dev",
  "list-category": "dev",
  'categoryManagement': 'dev',
  'UserManagement': 'dev',
  'asset-dashboard': 'dev',
  'list-assets': 'dev',
  'get_asset_json': 'dev',
  'asset-management': 'dev',
  'show-asset': 'dev',
  'asset-config': 'dev',
  'asset-data': 'dev',
  'Chatbox': 'dev',
  'ManageResolverGroup': 'dev',
  'getResolver': 'dev',
  'downloadtickets': 'dev',
  'downloadAssetPreview': 'dev',
  'assetBulkInsert': 'dev',
  'assetUsers': 'dev',
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