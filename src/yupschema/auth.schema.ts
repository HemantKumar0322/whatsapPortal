import * as Yup from 'yup';
import { PASSWORD_REGEX } from '@/utils/constants';
import {
  INVALID_KEY_ADDRESS,
  KEY_MIN_LENGTH,
  PASSWORD_REGEX_MESSAGE,
  REQUIRED_KEY,
  MAX_LENGTH
} from '@/utils/messgaes';

export const LoginSchema = Yup.object().shape({
  email: Yup
    .string()
    .trim()
    .email(INVALID_KEY_ADDRESS.replace('%key%', 'email'))
    .max(255, MAX_LENGTH.replace('%key%', 'email').replace('%length%', '255'))
    .required(REQUIRED_KEY.replace('%key%', 'email')),
  password: Yup
    .string()
    .trim()
    // .min(8, KEY_MIN_LENGTH.replace('%key%', 'password').replace('%length%', '8'))
    .max(255, MAX_LENGTH.replace('%key%', 'password').replace('%length%', '255'))
    // .matches(PASSWORD_REGEX, PASSWORD_REGEX_MESSAGE)
    .required(REQUIRED_KEY.replace('%key%', 'password')),
});


export const EmailSchema = Yup.object().shape({
  email: Yup
    .string()
    .trim()
    .email(INVALID_KEY_ADDRESS.replace('%key%', 'email'))
    .max(255, MAX_LENGTH.replace('%key%', 'email').replace('%length%', '255'))
    .required(REQUIRED_KEY.replace('%key%', 'email')),
});

export const PasswordSchema = Yup.object().shape({
  password: Yup
    .string()
    .trim()
    .min(8, KEY_MIN_LENGTH.replace('%key%', 'password').replace('%length%', '8'))
    .max(255, MAX_LENGTH.replace('%key%', 'password').replace('%length%', '255'))
    .matches(PASSWORD_REGEX, PASSWORD_REGEX_MESSAGE)
    .required(REQUIRED_KEY.replace('%key%', 'password')),
});


export const SignupSchema = Yup.object().shape({
  company_name: Yup
    .string()
    .trim()
    .max(255, MAX_LENGTH.replace('%key%', 'Company Name').replace('%length%', '255'))
    .required(REQUIRED_KEY.replace('%key%', 'Company Name')),
  exhibitor_contact_name: Yup
    .string()
    .trim()
    .max(255, MAX_LENGTH.replace('%key%', 'Exhibitor Contact Name').replace('%length%', '255'))
    .required(REQUIRED_KEY.replace('%key%', 'Exhibitor Contact Name')),
  email: Yup
    .string()
    .trim()
    .email(INVALID_KEY_ADDRESS.replace('%key%', 'email'))
    .max(255, MAX_LENGTH.replace('%key%', 'email').replace('%length%', '255'))
    .required(REQUIRED_KEY.replace('%key%', 'email')),
  phone_code: Yup
    .string()
    .trim()
    .max(255, MAX_LENGTH.replace('%key%', 'Phone Code').replace('%length%', '255'))
    .required(REQUIRED_KEY.replace('%key%', 'Phone Code')),
  phone: Yup
    .string()
    .trim()
    .matches(/^\d+$/, 'Phone number must be a number')
    .max(10, MAX_LENGTH.replace('%key%', 'phone').replace('%length%', '10'))
    .min(10, KEY_MIN_LENGTH.replace('%key%', 'phone').replace('%length%', '10'))
    .required(REQUIRED_KEY.replace('%key%', 'phone')),
  invoice_address: Yup
    .string()
    .trim()
    .max(255, MAX_LENGTH.replace('%key%', 'Invoice Address').replace('%length%', '255')),
  accounts_email: Yup
    .string()
    .trim()
    .email(INVALID_KEY_ADDRESS.replace('%key%', 'email'))
    .max(255, MAX_LENGTH.replace('%key%', 'Accounts Email').replace('%length%', '255')),
  vat_number: Yup
    .string()
    .trim()
    .max(255, MAX_LENGTH.replace('%key%', 'VAT Number').replace('%length%', '255')),
  password: Yup
    .string()
    .trim()
    .min(8, KEY_MIN_LENGTH.replace('%key%', 'password').replace('%length%', '8'))
    .max(255, MAX_LENGTH.replace('%key%', 'password').replace('%length%', '255'))
    .matches(PASSWORD_REGEX, PASSWORD_REGEX_MESSAGE)
    .required(REQUIRED_KEY.replace('%key%', 'password')),

  confirm_password: Yup
    .string()
    .trim()
    .oneOf([Yup.ref('password')], 'Confirm Passwords must match')
    .required(REQUIRED_KEY.replace('%key%', 'Confirm Password')),

});

export const ExhibitorSchema = Yup.object().shape({
  company_name: Yup
    .string()
    .trim()
    .max(255, MAX_LENGTH.replace('%key%', 'Company Name').replace('%length%', '255'))
    .required(REQUIRED_KEY.replace('%key%', 'Company Name')),
  exhibitor_contact_name: Yup
    .string()
    .trim()
    .max(255, MAX_LENGTH.replace('%key%', 'Exhibitor Contact Name').replace('%length%', '255'))
    .required(REQUIRED_KEY.replace('%key%', 'Exhibitor Contact Name')),
  email: Yup
    .string()
    .trim()
    .email(INVALID_KEY_ADDRESS.replace('%key%', 'email'))
    .max(255, MAX_LENGTH.replace('%key%', 'email').replace('%length%', '255'))
    .required(REQUIRED_KEY.replace('%key%', 'email')),
  phone_code: Yup
    .string()
    .trim()
    .max(255, MAX_LENGTH.replace('%key%', 'Phone Code').replace('%length%', '255'))
    .required(REQUIRED_KEY.replace('%key%', 'Phone Code')),
  phone: Yup
    .string()
    .trim()
    .matches(/^\d+$/, 'Phone number must be a number')
    .max(15, MAX_LENGTH.replace('%key%', 'phone').replace('%length%', '15'))
    .min(10, KEY_MIN_LENGTH.replace('%key%', 'phone').replace('%length%', '10'))
    .required(REQUIRED_KEY.replace('%key%', 'phone')),
  invoice_address: Yup
    .string()
    .trim()
    .max(255, MAX_LENGTH.replace('%key%', 'Invoice Address').replace('%length%', '255')),
    // .required(REQUIRED_KEY.replace('%key%', 'Invoice Address')),
  collection_address: Yup
    .string()
    .trim()
    .max(255, MAX_LENGTH.replace('%key%', 'Collection Address').replace('%length%', '255'))
    .required(REQUIRED_KEY.replace('%key%', 'Collection Address')),
  accounts_email: Yup
    .string()
    .trim()
    .email(INVALID_KEY_ADDRESS.replace('%key%', 'email'))
    .max(255, MAX_LENGTH.replace('%key%', 'Accounts Email').replace('%length%', '255')),
    // .required(REQUIRED_KEY.replace('%key%', 'Accounts Email')),
  vat_number: Yup
    .string()
    .trim()
    .max(255, MAX_LENGTH.replace('%key%', 'VAT Number').replace('%length%', '255'))
    // .required(REQUIRED_KEY.replace('%key%', 'VAT Number')),
});

export const EventDetailsSchema = Yup.object().shape({
  event_name: Yup
    .string()
    .trim()
    .max(255, MAX_LENGTH.replace('%key%', 'Event Name').replace('%length%', '255'))
    .required(REQUIRED_KEY.replace('%key%', 'Event Name')),
  venue: Yup
    .string()
    .trim()
    .max(255, MAX_LENGTH.replace('%key%', 'Venue').replace('%length%', '255'))
    .required(REQUIRED_KEY.replace('%key%', 'Venue')),
  event_dates: Yup
    .array()
    .of(Yup.string().trim().required(REQUIRED_KEY.replace('%key%', 'Event Dates')))
    .min(2, KEY_MIN_LENGTH.replace('%key%', 'Event Dates').replace('%length%', '2')),
  hall_stand_number: Yup
    .string()
    .trim()
    .max(255, MAX_LENGTH.replace('%key%', 'Hall / Stand Number').replace('%length%', '255'))
    .required(REQUIRED_KEY.replace('%key%', 'Hall / Stand Number')),
  event_country: Yup
    .string()
    .trim()
    .max(1000, MAX_LENGTH.replace('%key%', 'Event Country').replace('%length%', '1000'))
    .required(REQUIRED_KEY.replace('%key%', 'Event Country')),
});

export const ServiceLogisticsSchema = Yup.object().shape({
  service_type: Yup
    .string()
    .trim()
    .required(REQUIRED_KEY.replace('%key%', 'Service Type')),
  loading_facilities_available: Yup
    .string()
    .trim()
    .required(REQUIRED_KEY.replace('%key%', 'Loading Facilities Available')),
  vehicle_size_required: Yup
    .string()
    .trim()
    .max(255, MAX_LENGTH.replace('%key%', 'Vehicle Size Required').replace('%length%', '255')),
  palletized_or_loose_cargo: Yup
    .string()
    .trim(),
  estimated_volume: Yup
    .string()
    .trim()
    .matches(/^\d+$/, 'Estimated Volume must be a number')
});


export const ShipmentIntentionSchema = Yup.object().shape({
  shipping_goods: Yup
    .string()
    .trim()
    .required(REQUIRED_KEY.replace('%key%', 'This is a required field')),
});

export const CollectionSchema = Yup.object().shape({
  collection_contact_name: Yup
    .string()
    .trim()
    .max(255, MAX_LENGTH.replace('%key%', 'Collection Contact Name').replace('%length%', '255'))
    .required(REQUIRED_KEY.replace('%key%', 'Collection Contact Name')),
  collection_reference_number: Yup
    .string()
    .trim()
    .max(255, MAX_LENGTH.replace('%key%', 'Collection Reference Number').replace('%length%', '255')),
  collection_date: Yup
    .string()
    .trim()
    .required(REQUIRED_KEY.replace('%key%', 'Collection Date')),
  goods_ready_date: Yup
    .string()
    .trim()
    .required(REQUIRED_KEY.replace('%key%', 'Goods Ready Date')),
});

export const ShipmentDetailsSchema = Yup.object().shape({
  item_number: Yup
    .string()
    .trim()
    .max(255, MAX_LENGTH.replace('%key%', 'Item Number').replace('%length%', '255'))
    .required(REQUIRED_KEY.replace('%key%', 'Item Number')),
  dimensions_length: Yup
    .string()
    .trim()
    .matches(/^\d+(\.\d+)?$/, 'Dimensions Length must be a valid decimal number')
    .max(255, MAX_LENGTH.replace('%key%', 'Dimensions Length').replace('%length%', '255'))
    .required(REQUIRED_KEY.replace('%key%', 'Dimensions Length')),
  dimensions_width: Yup
    .string()
    .trim()
    .matches(/^\d+(\.\d+)?$/, 'Dimensions Width must be a valid decimal number')
    .max(255, MAX_LENGTH.replace('%key%', 'Dimensions Width').replace('%length%', '255'))
    .required(REQUIRED_KEY.replace('%key%', 'Dimensions Width')),
  dimensions_height: Yup
    .string()
    .trim()
    .matches(/^\d+(\.\d+)?$/, 'Dimensions Height must be a valid decimal number')
    .max(255, MAX_LENGTH.replace('%key%', 'Dimensions Height').replace('%length%', '255'))
    .required(REQUIRED_KEY.replace('%key%', 'Dimensions Height')),
  weight: Yup
    .string()
    .matches(/^\d+(\.\d+)?$/, 'Weight must be a valid decimal number')
    .required(REQUIRED_KEY.replace('%key%', 'Weight')),
  declared_value: Yup
    .string()
    .trim()
    .optional(),
  description: Yup
    .string()
    .trim()
    .max(500, MAX_LENGTH.replace('%key%', 'Description').replace('%length%', '500'))
  // .required(REQUIRED_KEY.replace('%key%', 'Description')),
});

export const ReturnShippingSchema = Yup.object().shape({
  will_goods_be_returned: Yup
    .string()
    .trim()
    .required(REQUIRED_KEY.replace('%key%', 'Will goods be returned?')),
  return_shipment_date: Yup
    .string()
    .trim()
    .when('will_goods_be_returned', {
      is: 'yes',
      then: (schema) => schema.required(REQUIRED_KEY.replace('%key%', 'Return Shipment Date')),
      otherwise: (schema) => schema.optional(),
    }),
});

export const InsuranceSchema = Yup.object().shape({
  insurance_required: Yup
    .string()
    .trim()
    .required(REQUIRED_KEY.replace('%key%', 'Insurance Required?')),
  empty_case_storage_required: Yup
    .string()
    .trim()
    .required(REQUIRED_KEY.replace('%key%', 'Empty Case Storage Required?')),
  estimated_cbm_for_storage: Yup
    .string()
    .trim()
    .matches(/^\d+(\.\d+)?$/, 'Estimated CBM must be a valid decimal number')
    .when('empty_case_storage_required', {
      is: 'yes',
      then: (schema) => schema.required(REQUIRED_KEY.replace('%key%', 'Estimated CBM for Storage')),
      otherwise: (schema) => schema.optional(),
    }),
  special_instructions: Yup
    .string()
    .trim()
    .max(500, MAX_LENGTH.replace('%key%', 'Special Instructions').replace('%length%', '500')),
});

export const OnSiteSchema = Yup.object().shape({
  name: Yup
    .string()
    .trim()
    .max(255, MAX_LENGTH.replace('%key%', 'Name').replace('%length%', '255'))
    .required(REQUIRED_KEY.replace('%key%', 'Name')),
  email: Yup
    .string()
    .trim()
    .email(INVALID_KEY_ADDRESS.replace('%key%', 'email'))
    .max(255, MAX_LENGTH.replace('%key%', 'email').replace('%length%', '255'))
    .required(REQUIRED_KEY.replace('%key%', 'email')),
  phone: Yup
    .string()
    .trim()
    .matches(/^\d+$/, 'Phone number must be a number')
    .max(15, MAX_LENGTH.replace('%key%', 'phone').replace('%length%', '15'))
    .min(10, KEY_MIN_LENGTH.replace('%key%', 'phone').replace('%length%', '10'))
    .required(REQUIRED_KEY.replace('%key%', 'phone')),
});


export const DetailsEditSchema = Yup.object().shape({
  company_name: Yup
    .string()
    .trim()
    .max(255, MAX_LENGTH.replace('%key%', 'Company Name').replace('%length%', '255'))
    .required(REQUIRED_KEY.replace('%key%', 'Company Name')),
  exhibitor_contact_name: Yup
    .string()
    .trim()
    .max(255, MAX_LENGTH.replace('%key%', 'Exhibitor Contact Name').replace('%length%', '255'))
    .required(REQUIRED_KEY.replace('%key%', 'Exhibitor Contact Name')),
  phone_code: Yup
    .string()
    .trim()
    .max(255, MAX_LENGTH.replace('%key%', 'Phone Code').replace('%length%', '255'))
    .required(REQUIRED_KEY.replace('%key%', 'Phone Code')),
  phone: Yup
    .string()
    .trim()
    .matches(/^\d+$/, 'Phone number must be a number')
    .max(15, MAX_LENGTH.replace('%key%', 'phone').replace('%length%', '15'))
    .min(10, KEY_MIN_LENGTH.replace('%key%', 'phone').replace('%length%', '10'))
    .required(REQUIRED_KEY.replace('%key%', 'phone')),
  vat_number: Yup
    .string()
    .trim()
    .max(255, MAX_LENGTH.replace('%key%', 'VAT Number').replace('%length%', '255')),
  invoice_address: Yup
    .string()
    .trim()
    .max(255, MAX_LENGTH.replace('%key%', 'Invoice Address').replace('%length%', '255')),
  email: Yup
    .string()
    .trim()
    .email(INVALID_KEY_ADDRESS.replace('%key%', 'email'))
    .max(255, MAX_LENGTH.replace('%key%', 'email').replace('%length%', '255'))
    .required(REQUIRED_KEY.replace('%key%', 'email')),
  accounts_email: Yup
    .string()
    .trim()
    .email(INVALID_KEY_ADDRESS.replace('%key%', 'email'))
    .max(255, MAX_LENGTH.replace('%key%', 'Accounts Email').replace('%length%', '255'))
});