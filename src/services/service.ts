import { useMutation, useQuery } from '@tanstack/react-query';

import {
  forgotPasswordRtkKey,
  getEventListRtkKey,
  getPhoneCodeRtkKey,
  getServiceTypesRtkKey,
  getCargoTypesRtkKey,
  loginRtkKey,
  signupRtkKey,
  verifyOtpRtkKey,
  createEnquiryRtkKey,
  getEnquiriesRtkKey,
  getEnquiryByIdRtkKey,
  deleteEnquiryRtkKey,
  submitDraftRtkKey,
  resetPasswordRtkKey,
  resendOtpRtkKey,
  updateDetailsRtkKey,
  getProfileRtkKey,
  getTrackingListRtkKey,
  getReturnTrackingListRtkKey,
  refreshTrackingStatusRtkKey,
  getShippingTrackingDetailsRtkKey,
  getArticlesRtkKey,
  getVendorsRtkKey,
  getLedgerItemsRtkKey,
  getProposeOrderRtkKey,
  getItemsRtkKey
} from '@/utils/rtkKeys';
import {
  getEventListApi,
  getPhoneCodeApi,
  getServiceTypesApi,
  getCargoTypesApi,
  loginApi,
  sendOtpApi,
  signupApi,
  verifyOtpApi,
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
  getShippingTrackingDetailsApi,
  getArticlesApi,
  getVendorsApi,
  getLedgerItemsApi,
  getProposeOrderApi,
  getItemsApi
} from './apiService';

export function useLoginMutation() {
  return useMutation<any, Error, any>({
    mutationKey: [loginRtkKey],
    mutationFn: (payload: any) => loginApi(payload),
  });
}

export function useGetArticlesQuery(params: any = "page=1&limit=10", options: any = {}) {

  return useQuery<any, Error, any>({
    queryKey: [getArticlesRtkKey, params],
    queryFn: async () => {
      const response = await getArticlesApi(params);
      return response;
    },
    // ...options
  });
}

export function useGetVendorsQuery(params: any = "page=1&limit=10", options: any = {}) {
  return useQuery<any, Error, any>({
    queryKey: [getVendorsRtkKey, params],
    queryFn: async () => {
      const response = await getVendorsApi(params);
      return response;
    },
    // ...options
  });
}

export function useGetLedgerItemsQuery(params: any = "page=1&limit=10", options: any = {}) {
  return useQuery<any, Error, any>({
    queryKey: [getLedgerItemsRtkKey, params],
    queryFn: async () => {
      const response = await getLedgerItemsApi(params);
      return response;
    },
    // ...options
  });
}


export function useGetProposeOrderQuery(params: any = "page=1&limit=10", options: any = {}) {
  return useQuery<any, Error, any>({
    queryKey: [getProposeOrderRtkKey, params],
    queryFn: async () => {
      const response = await getProposeOrderApi(params);
      return response;
    },
    // ...options
  });
}


export function useGetItemsQuery(params: any , options: any = {}) {
  return useQuery<any, Error, any>({
    queryKey: [getItemsRtkKey, params],
    queryFn: async () => {
      const response = await getItemsApi(params);
      return response;
    },
    // ...options
  });
}

export function useSendOtpMutation() {
  return useMutation<any, Error, any>({
    mutationKey: [forgotPasswordRtkKey],
    mutationFn: async (payload: any) => {
      const response = await sendOtpApi(payload);
      return response;
    },
  });
}

export function useSignupMutation() {
  return useMutation<any, Error, any>({
    mutationKey: [signupRtkKey],
    mutationFn: async (payload: any) => {
      try {
        const response = await signupApi(payload);
        return response;
      } catch (error: any) {
        const message = error?.response?.data?.message || "Signup failed. Please try again.";
        throw new Error(message);
      }
    },
  });
}

export function useVerifyOtpMutation() {
  return useMutation<any, Error, any>({
    mutationKey: [verifyOtpRtkKey],
    mutationFn: async (payload: any) => {
      try {
        const response = await verifyOtpApi(payload);
        return response;
      } catch (error: any) {
        const message = error?.response?.data?.message || "OTP verification failed. Please try again.";
        throw new Error(message);
      }
    },
  });
}

export function useGetPhoneCodeQuery() {
  return useQuery<any, Error, any>({
    queryKey: [getPhoneCodeRtkKey],
    queryFn: async () => {
      const response = await getPhoneCodeApi();
      return response;
    },
  });
}

export function useGetEventListQuery() {
  return useQuery<any, Error, any>({
    queryKey: [getEventListRtkKey],
    queryFn: async () => {
      const response = await getEventListApi();
      return response;
    },
  });
}

export function useGetServiceTypesQuery() {
  return useQuery<any, Error, any>({
    queryKey: [getServiceTypesRtkKey],
    queryFn: async () => {
      const response = await getServiceTypesApi();
      return response;
    },
  });
}

export function useGetCargoTypesQuery() {
  return useQuery<any, Error, any>({
    queryKey: [getCargoTypesRtkKey],
    queryFn: async () => {
      const response = await getCargoTypesApi();
      return response;
    },
  });
}

export function useCreateEnquiryMutation() {
  return useMutation<any, Error, any>({
    mutationKey: [createEnquiryRtkKey],
    mutationFn: async (payload: any) => {
      const response = await createEnquiryApi(payload);
      return response;
    },
  });
}

export function useGetEnquiriesQuery(params: any = {}, options: any = {}) {
  return useQuery<any, Error, any>({
    queryKey: [getEnquiriesRtkKey, params],
    queryFn: async ({ queryKey }) => {
      const [_key, actualParams] = queryKey;
      const response = await getEnquiriesApi(actualParams);
      return response;
    },
    ...options
  });
}


export function useGetEnquiryByIdQuery() {
  return useMutation<any, Error, any>({
    mutationKey: [getEnquiryByIdRtkKey],
    mutationFn: async (id: any) => {
      const response = await getEnquiryByIdApi(id);
      return response;
    },
  });
}


export function useDeleteEnquiryMutation() {
  return useMutation<any, Error, any>({
    mutationKey: [deleteEnquiryRtkKey],
    mutationFn: async (id: any) => {
      const response = await deleteEnquiryApi(id);
      return response;
    },
  });
}

export function useSubmitDraftMutation() {
  return useMutation<any, Error, any>({
    mutationKey: [submitDraftRtkKey],
    mutationFn: async (id: any) => {
      const response = await submitDraftApi(id);
      return response;
    },
  });
}

export function useResetPasswordMutation() {
  return useMutation<any, Error, any>({
    mutationKey: [resetPasswordRtkKey],
    mutationFn: async (data: any) => {
      const response = await resetPasswordApi(data);
      return response;
    },
  });
}

export function useResendOtpMutation() {
  return useMutation<any, Error, any>({
    mutationKey: [resendOtpRtkKey],
    mutationFn: async (data: any) => {
      const response = await resendOtpApi(data);
      return response;
    },
  });
}

export function useUpdateDetailsMutation() {
  return useMutation<any, Error, any>({
    mutationKey: [updateDetailsRtkKey],
    mutationFn: async (data: any) => {
      const response = await updateDetailsApi(data);
      return response;
    },
  });
}

export function useGetProfileQuery() {
  return useQuery<any, Error, any>({
    queryKey: [getProfileRtkKey],
    queryFn: async () => {
      const response = await getProfileApi();
      return response;
    },
  });
}


export function useGetTrackingListQuery(params: any = {}, options: any = {}) {
  return useQuery<any, Error, any>({
    queryKey: [getTrackingListRtkKey, params],
    queryFn: async ({ queryKey }) => {
      const [_key, actualParams] = queryKey;
      const response = await getTrackingListApi(actualParams);
      return response;
    },
    ...options
  });
}

export function useGetReturnTrackingListQuery(params: any = {}, options: any = {}) {
  return useQuery<any, Error, any>({
    queryKey: [getReturnTrackingListRtkKey, params],
    queryFn: async ({ queryKey }) => {
      const [_key, actualParams] = queryKey;
      const response = await getReturnTrackingListApi(actualParams);
      return response;
    },
    ...options
  });
}

export function useRefreshTrackingStatusMutation() {
  return useMutation<any, Error, any>({
    mutationKey: [refreshTrackingStatusRtkKey],
    mutationFn: async () => {
      const response = await refreshTrackingStatusApi();
      return response;
    },
  });
}

export function useGetShippingTrackingDetailsQuery(id: any, options: any = {}) {
  return useQuery<any, Error, any>({
    queryKey: [getShippingTrackingDetailsRtkKey, id],
    queryFn: async ({ queryKey }) => {
      const [_key, actualId] = queryKey;
      const response = await getShippingTrackingDetailsApi(actualId);
      return response;
    },
    ...options
  });
}

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  return !!token;
};

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const getUser = (): any => {
  const user = localStorage.getItem('user');
  if (!user) {
    return null;
  }
  return JSON.parse(user as unknown as string);
};


export const clearAuth = (): void => {
  localStorage.clear();
  window.location.href = '/login';
}; 