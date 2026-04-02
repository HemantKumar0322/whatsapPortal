import { apiInterceptor, publicApiInterceptor } from "./api";
import { API_ENDPOINTS } from "@/config/apiEndpoints";

const loginApi = async (credentials: string): Promise<any> => {
  const response = await publicApiInterceptor.post(`${API_ENDPOINTS.AUTH.LOGIN}`, credentials);
  return response;
};

const getArticlesApi = async (params: any): Promise<any> => {
  try {
    const response = await publicApiInterceptor.get(`${API_ENDPOINTS.ARTICLES.GET_ARTICLES}?${params}`);
    return response;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Get articles failed');
  }
};

const getVendorsApi = async (params: any): Promise<any> => {
  try {
    const response = await publicApiInterceptor.get(`${API_ENDPOINTS.VENDORS.GET_VENDORS}?${params}`);
    return response;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Get Vendors failed');
  }
};

const getLedgerItemsApi = async (params: any): Promise<any> => {
  try {
    const response = await publicApiInterceptor.get(`${API_ENDPOINTS.LEDGER.GET_LEDGER_ITEMS}?${params}`);
    return response;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Get Ledger Items failed');
  }
};

const getProposeOrderApi = async (params: any): Promise<any> => {
  try {
    const response = await publicApiInterceptor.get(`${API_ENDPOINTS.ORDER.GET_ORDER}?${params}`);
    return response;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Get Order failed');
  }
};

const getItemsApi = async (params: any): Promise<any> => {
  try {
    const response = await publicApiInterceptor.get(`${API_ENDPOINTS.ITEMS.GET_ITEMS}?item_no=${params}`);
    return response;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Get Items failed');
  }
};

const sendOtpApi = async (data: any): Promise<any> => {
  const response = await publicApiInterceptor.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD_SEND_OTP, data);
  return response;
};

const signupApi = async (data: any): Promise<any> => {
  const response = await publicApiInterceptor.post(API_ENDPOINTS.AUTH.SIGNUP, data);
  return response;
};


const verifyOtpApi = async (data: any): Promise<any> => {
  const response = await publicApiInterceptor.post(API_ENDPOINTS.AUTH.VERIFY_OTP, data);
  return response;
};


const getPhoneCodeApi = async (): Promise<any> => {
  const response = await publicApiInterceptor.get(API_ENDPOINTS.COMMON.PHONE_CODE);
  return response;
};


const resetPasswordApi = async (data: any): Promise<any> => {
  const response = await publicApiInterceptor.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, data);
  return response;
};


const resendOtpApi = async (data: any): Promise<any> => {
  const response = await publicApiInterceptor.post(API_ENDPOINTS.AUTH.RESEND_OTP, data);
  return response;
};



const getEventListApi = async (): Promise<any> => {
  const response = await apiInterceptor.get(API_ENDPOINTS.COMMON.EVENT_LIST);
  return response;
};

const getServiceTypesApi = async (): Promise<any> => {
  const response = await apiInterceptor.get(API_ENDPOINTS.COMMON.SERVICE_TYPES);
  return response;
};

const getCargoTypesApi = async (): Promise<any> => {
  try {
    const response = await apiInterceptor.get(API_ENDPOINTS.COMMON.CARGO_TYPES);
    return response;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Get cargo types failed');
  }
};

const createEnquiryApi = async (data: any): Promise<any> => {
  try {
    const response = await apiInterceptor.post(API_ENDPOINTS.ENQUIRY.CREATE_ENQUIRY, data);
    return response;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Create enquiry failed');
  }
};


const getEnquiriesApi = async (params: any): Promise<any> => {

  let apiParam = ''
  if (params?.page && params?.pageSize) {
    apiParam = `?page=${params?.page}&page_size=${params?.pageSize}`
  }

  if (params?.status && params?.status !== '') {
    apiParam = `${apiParam}&status=${params?.status}`
  }

  if (params?.search && params?.search !== '') {
    apiParam = `${apiParam}&event_name=${params?.search}`
  }

  const response = await apiInterceptor.get(`${API_ENDPOINTS.ENQUIRY.GET_ENQUIRIES}${apiParam}`);
  return response;
};

const updateDetailsApi = async (data: any): Promise<any> => {
  const response = await apiInterceptor.put(API_ENDPOINTS.AUTH.PROFILE_UPDATE, data);
  return response;
};


const getEnquiryByIdApi = async (id: any): Promise<any> => {
  const response = await apiInterceptor.post(`${API_ENDPOINTS.ENQUIRY.GET_ENQUIRY_BY_ID}?id=${id}`);
  return response;
};

const deleteEnquiryApi = async (id: any): Promise<any> => {
  const response = await apiInterceptor.delete(`${API_ENDPOINTS.ENQUIRY.DELETE_ENQUIRY}?id=${id}`);
  return response;
};

const submitDraftApi = async (id: any): Promise<any> => {
  const response = await apiInterceptor.post(`${API_ENDPOINTS.ENQUIRY.SUBMIT_DRAFT}?enquiry_id=${id}`);
  return response;
};

const getProfileApi = async (): Promise<any> => {
  const response = await apiInterceptor.get(`${API_ENDPOINTS.AUTH.PROFILE_GET}`);
  return response;
};

const getTrackingListApi = async (params: any): Promise<any> => {

  let apiParam = ''
  if (params?.page && params?.pageSize) {
    apiParam = `?page=${params?.page}&page_size=${params?.pageSize}`
  }

  // if (params?.status && params?.status !== '') {
  //   apiParam = `${apiParam}&status=${params?.status}`
  // }

  if (params?.search && params?.search !== '') {
    apiParam = `${apiParam}&search=${params?.search}`
  }

  const response = await apiInterceptor.get(`${API_ENDPOINTS.TRACKING.GET_TRACKING_LIST}${apiParam}`);
  return response;
};

const getReturnTrackingListApi = async (params: any): Promise<any> => {

  let apiParam = ''
  if (params?.page && params?.pageSize) {
    apiParam = `?page=${params?.page}&page_size=${params?.pageSize}`
  }

  // if (params?.status && params?.status !== '') {
  //   apiParam = `${apiParam}&status=${params?.status}`
  // }

  if (params?.search && params?.search !== '') {
    apiParam = `${apiParam}&event_name=${params?.search}`
  }

  const response = await apiInterceptor.get(`${API_ENDPOINTS.TRACKING.GET_RETURN_TRACKING_LIST}${apiParam}`);
  return response;
};


const refreshTrackingStatusApi = async (): Promise<any> => {
  const response = await apiInterceptor.post(`${API_ENDPOINTS.TRACKING.REFRESH_TRACKING_STATUS}`);
  return response;
};


const getShippingTrackingDetailsApi = async (id: any): Promise<any> => {
  console.log(" ====> id ", id);
  const response = await apiInterceptor.get(`${API_ENDPOINTS.TRACKING.GET_SHIPPING_TRACKING_DETAILS}/${id}`);
  return response;
};


export {
  loginApi,
  getArticlesApi,
  getVendorsApi,
  getLedgerItemsApi,
  getProposeOrderApi,
  getItemsApi,

  sendOtpApi,
  signupApi,
  getPhoneCodeApi,
  verifyOtpApi,
  getEventListApi,
  getServiceTypesApi,
  getCargoTypesApi,
  createEnquiryApi,
  getEnquiriesApi,
  getEnquiryByIdApi,
  deleteEnquiryApi,
  submitDraftApi,
  resetPasswordApi,
  resendOtpApi,
  updateDetailsApi,
  getProfileApi,
  getTrackingListApi,
  getReturnTrackingListApi,
  refreshTrackingStatusApi,
  getShippingTrackingDetailsApi
};