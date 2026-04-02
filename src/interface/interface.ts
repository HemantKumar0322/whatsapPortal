import { ReactNode } from "react";

// Authentication Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  message?: string;
}

export interface ApiError {
  message: string;
  status: number;
}

// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: number;
  success: boolean;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  logout: () => void;
}

export interface ProtectedRouteProps {
  children: React.ReactNode;
}


export interface LoginFormValues {
  email: string;
  password: string;
}


export interface Coupon {
  _id: string;
  name: string;
  headline: string;
  tagline: string;
  details: string[];
  city: string[];
  discountType: string;
  discountValue: number;
  maxDiscountAmount: number | null;
  usageLimit: number;
  minimumPurchase: number;
  applyOnBrand: string[];
  applyOnUser: string[];
  couponCount: number;
  couponAppliedCount: number;
  isHidden: boolean;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  startDate: string;
  endDate: string;
}

export interface AccordionPanel {
  key: string;  
  label: React.ReactNode;
  children: React.ReactNode;
}

export interface AccordionProps {
  panels: AccordionPanel[];
  className?: string;
  defaultActiveKey?: string[];
  setActiveKey?: (key: string[]) => void;
  activeKey?: string[];
  mode?: string;
}



export interface ExhibitorFormValues {
  company_name: string;
  exhibitor_contact_name: string;
  email: string;
  phone: string;
  phone_code: string;
  invoice_address: string;
  collection_address: string;
  accounts_email: string;
  vat_number: string;
}

export interface EventDetailsFormValues {
  event_name: string;
  venue: string;
  event_dates: [string, string];
  hall_stand_number: string;
  event_country?: string;
}

export interface ServiceLogisticsFormValues {
  service_type: string;
  loading_facilities_available: string;
  vehicle_size_required: string;
  palletized_or_loose_cargo: string;
  estimated_volume: string;
}

export interface ShipmentIntentionFormValues {
  shipping_goods: string;
}

export interface CollectionFormValues {
  collection_contact_name: string;
  collection_reference_number: string;
  collection_date: string;
  goods_ready_date: string;
}

export interface ShipmentDetailsFormValues {
  item_number: number;
  dimensions_length: any;
  dimensions_width: any;
  dimensions_height: any;
  weight: any;
  declared_value: any;
  description: string;
}

export interface ReturnShippingFormValues {
  will_goods_be_returned: string;
  return_shipment_date: string;
}

export interface InsuranceFormValues {
  insurance_required: string;
  empty_case_storage_required: string;
  estimated_cbm_for_storage: number | string;
  special_instructions: string;
}

export interface OnSiteFormValues {
  name: string;
  email: string;
  phone: string;
}

export interface Tracking {
  key: string;
  enquiryNo: string;
  carrier: string;
  trackingNumber: string;
  status: string;
}

// export interface bcMatrix {
//   item_no: string;
//   description: string;
//   replenishment: string;
//   itemCategoryCode: string;
//   MinimumOrderQuantity: string;
//   maximumOrderQuantity: string;
//   orderMultiple: string;
//   lead_time_days: string;
//   safetyLeadTime: string;
//   vendor_name: string;
//   unitCost: string;
//   availableQty: string;
//   [key: string]: any;
// }

// export interface uPurchaseMetrics {
//   forecastAdjustment: string;
//   forecastAdjustmentPeriod: string;
//   Replenishment: string;
//   [key: string]: any;
// }

// export interface CalculatedFields {
//   rop: string;
//   service_level: string;
//   safety_stock: string;
//   z_value: string;
//   ddlt: string;
//   eoq: string;
//   annual_demand: string;
//   orderingCost: string;
//   holdingCost: string;
//   correctionFactor: string;
//   suggested_qty: string;
//   [key: string]: any;
// }

export interface renderDataType {
  title: string;
  value: any;
}

export interface HistoricalData {
  month: string;
  opening: number;
  receipts: number;
  demand: number;
  closing: number;
  [key: string]: any; // Allow additional properties
}
