
// const BASE_URL = 'https://upurchase-api-production.up.railway.app/u-purchase';

const BASE_URL = 'http://134.149.216.105:8004/u-purchase';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    FORGOT_PASSWORD_SEND_OTP: `${BASE_URL}/auth/forgot-password`,
    SIGNUP: `${BASE_URL}/auth/signup`,
    VERIFY_OTP: `${BASE_URL}/auth/verify-otp`,
    RESET_PASSWORD: `${BASE_URL}/auth/reset-password`,
    RESEND_OTP: `${BASE_URL}/auth/resend-otp`,
    PROFILE_UPDATE: `${BASE_URL}/auth/user/profile/update`,
    PROFILE_GET: `${BASE_URL}/auth/me`,
  },

  ARTICLES: {
    GET_ARTICLES: `${BASE_URL}/common/get-articles`,
  },

  VENDORS: {
    GET_VENDORS: `${BASE_URL}/common/get-vendors`
  },

  LEDGER: {
    GET_LEDGER_ITEMS: `${BASE_URL}/common/get-item-ledger`
  },

  ORDER: {
    GET_ORDER: `${BASE_URL}/order-line/get-proposed-order-lines`,
  },

  ITEMS: {
    GET_ITEMS: `${BASE_URL}/common/get-article-detail`
  },

  COMMON: {
    PHONE_CODE: `${BASE_URL}/master/phone-codes`,
    EVENT_LIST: `${BASE_URL}/master/events`,
    SERVICE_TYPES: `${BASE_URL}/master/service-types`,
    CARGO_TYPES: `${BASE_URL}/master/cargo-types`,
  },

  ENQUIRY: {
    CREATE_ENQUIRY: `${BASE_URL}/forms/draft-enquiries/save`,
    GET_ENQUIRIES: `${BASE_URL}/forms/draft-enquiries/list`,
    GET_ENQUIRY_BY_ID: `${BASE_URL}/forms/draft-enquiries/get`,
    DELETE_ENQUIRY: `${BASE_URL}/forms/draft-enquiries/delete`,
    SUBMIT_DRAFT: `${BASE_URL}/forms/enquiries/submit`,
  },

  TRACKING: {
    GET_TRACKING_LIST: `${BASE_URL}/tracking/shipping-list`,
    GET_RETURN_TRACKING_LIST: `${BASE_URL}/tracking/return-list`,
    REFRESH_TRACKING_STATUS: `${BASE_URL}/tracking/refresh-tracking-status`,
    GET_SHIPPING_TRACKING_DETAILS: `${BASE_URL}/tracking/shipping-tracking-history`,
  }

} as const;



