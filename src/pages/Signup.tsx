import React, { Suspense, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';

import { PhoneOutlined, LoadingOutlined, LockOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

import { LabelInput, FormError } from '@/components/LabelInput';
import InputCustom from '@/components/InputCustom';
import ButtonSimple from '@/components/ButtonSimple';

import { logHelper } from '@/utils';
import { SignupSchema } from '@/yupschema/auth.schema';
import { useResendOtpMutation, useSignupMutation, useVerifyOtpMutation } from '@/services/service';
import AuthUi from '@/container/AuthUi';
import InputOtp from '@/components/InputOtp';
import ResultPage from '@/container/ResultPage';
import { useAppNotification } from '@/hooks/useAppNotification';
import Timer from '@/components/Timer';
import CountrySelect from '@/components/Country';

const TAG: string = 'Signup:';
const Signup: React.FC = () => {

  const navigate = useNavigate();
  const { successToast, errorToast } = useAppNotification();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [screen, setScreen] = useState<('signup' | 'verify')>('signup');
  const [isError, setIsError] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [enableResendOtp, setEnableResendOtp] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);

  const signupFormRef = useRef<any>(null);

  const initialValues = {
    company_name: '',
    exhibitor_contact_name: '',
    email: '',
    accounts_email: '',
    phone_code: '',
    phone: '',
    vat_number: '',

    password: '',
    invoice_address: '',
    confirm_password: ''
  };

  const {
    mutate: resendOtp
  } = useResendOtpMutation();


  const {
    mutate: signup
  } = useSignupMutation();


  const {
    mutate: verifyOtp
  } = useVerifyOtpMutation();




  const handleSubmit = async (values: any) => {

    logHelper(TAG, 'handleSubmit', values);
    // delete values.confirm_password;
    if (values.accounts_email == "" || values.accounts_email == undefined) { delete values.accounts_email }
    if (values.vat_number == "" || values.vat_number == undefined) { delete values.vat_number }
    if (values.invoice_address == "" || values.invoice_address == undefined) { delete values.invoice_address }

    values.phone_code = selectedCountry?.phone;

    setLoading(true);

    signup(values, {
      onSuccess: (res: any) => {

        logHelper(TAG, ' ====> handleSubmit ', res);

        if (res?.status !== 200) {
          // setIsError(res?.data?.message || 'Something went wrong');
          errorToast(res?.data?.errorMessage || 'Something went wrong');
          return;
        }

        if (res?.data?.status !== "success") {
          errorToast(res?.data?.errorMessage || 'Something went wrong');
          return;
        }

        successToast(res?.data?.errorMessage || 'Signup successful');
        setScreen('verify');

      },
      onError: (error: any) => {

        logHelper(TAG, ' ====> handleSubmit ', error);
        errorToast(error?.errorMessage || 'Something went wrong');

      },
      onSettled: () => {
        setLoading(false);
      }
    });

  };

  const handleVerifyOtp = async () => {

    setLoading(true);

    const payload = {
      email: email.trim(),
      otp_code: otp
    };

    logHelper(TAG, ' ===> handleVerifyOtp ', payload);
    // navigate('/login');


    verifyOtp(payload, {
      onSuccess: (res: any) => {

        logHelper(TAG, ' ====> handleVerifyOtp ', res);

        if (res?.status !== 200) {
          errorToast(res?.data?.message || 'Something went wrong');
          return;
        }

        if (res?.data?.status !== "success") {
          errorToast(res?.data?.message || 'Something went wrong');
          return;
        }

        if (res?.data?.status === "success") {
          successToast(res?.data?.message || 'OTP verified successfully');
          navigate('/login');
        }

      },
      onError: (error: any) => {
        logHelper(TAG, ' ====> handleVerifyOtp ', error);
        errorToast(error?.response?.data?.errorMessage || 'Something went wrong');
      },
      onSettled: () => {
        setLoading(false);
      }
    });

  };


  const callResendOtp = async () => {

    setLoading(true);

    logHelper(TAG, ' ===> callResendOtp ', "");

    const payload = { email: email.trim() };

    logHelper(TAG, ' ===> callResendOtp ', payload);

    resendOtp(payload, {
      onSuccess: (res: any) => {

        logHelper(TAG, ' ===> callResendOtp ', res);

        if (res?.status !== 200 || res?.data?.status !== "success" || res?.data?.statusCode !== 200) {
          errorToast(res?.data?.errorMessage || 'Something went wrong');
          return;
        }

        successToast(res?.data?.message || 'OTP resent successfully');

      },
      onError: (error: any) => {
        logHelper(TAG, ' ===> callResendOtp ', error);
        errorToast(error?.response?.data?.errorMessage || 'Something went wrong');
      },
      onSettled: () => {
        setLoading(false);
      }
    });


  };

  // React.useEffect(() => {
  //   const signupFormElement = document.getElementById('signupFormContent');
  //   if (signupFormElement) {
  //     const height = signupFormElement.offsetHeight;
  //     logHelper(TAG, 'Signup form height in pixels:', height);
  //     setHeight(height);
  //   }
  // }, [screen]);

  const onChange = (text: any) => {
    setOtp(text);
  };

  const onInput = (value: any) => {
  };


  logHelper(TAG, ' ===> selectedCountry ', selectedCountry);

  if (isError) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <ResultPage
          status="error"
          title="Something went wrong"
          subTitle={isError}
        />
      </Suspense>
    )
  }

  return (
    <AuthUi>

      {screen === 'verify' && (
        <div
          className=" md:w-[25rem] md:max-w-[25rem] w-full shadow-2x rounded-[25px] md:bg-[#f7f7f7] bg-[#f3f3f4b8] md:max-h-[100vh] overflow-hidden pt-[1rem] pb-[1rem] md:h-[330px] h-auto "
        >

          <div className="h-full overflow-y-auto px-8">
            <div className="text-[#363536] font-semibold ">
              <div className="text-lg mb-1 text-left">Verification</div>
            </div>

            <div className="text-[#00000099] text-[11px] mt-2 mb-[1rem] ">
              Please enter the One-Time Password to verify your account
            </div>

            <div className="text-[#00000099] text-[14px] mt-2 mb-[1rem] text-center font-semibold ">
              <p className="mb-1">A One-Time Password has been sent to</p>
              <p className="">{email}</p>
            </div>

            <div className="relative">

              <div className="flex justify-center mt-5">
                <InputOtp
                  onChange={onChange}
                  onInput={onInput}
                  inputMode="numeric"
                  length={6}
                  id="otp"
                  autoFocus={true}
                />
              </div>

              <ButtonSimple
                className=" py-3 hover:bg-[#283141] !bg-[#425468] !text-white !hover:text-white !focus:text-white mt-5 "
                htmlType="submit"
                disabled={loading}
                onClick={() => handleVerifyOtp()}
              >
                <p className=" m-0 p-0 text-[14px] uppercase "> {loading ? 'Validating...' : 'VALIDATE'}</p>
              </ButtonSimple>

              {loading && (
                <div className=" absolute top-0 left-0 w-full h-full bg-[#ffffff85] z-10 flex justify-center items-center">
                  <LoadingOutlined size={50} />
                </div>
              )}

              {/* <p className="text-center text-[#BE0000] text-[11px] mt-5 cursor-pointer hover:underline">Resend one-time password</p> */}

              <div className="flex justify-center mt-5 items-center">
                {enableResendOtp ? (
                  <p
                    onClick={() => { callResendOtp(); }}
                    className="text-center text-[#BE0000] text-[11px] mt-5 cursor-pointer hover:underline"
                  >Resend one-time password</p>
                ) : (
                  <>
                    <p className="text-center text-[#3e5ab5] text-[11px] mr-2 ">You can request another otp in</p>
                    <Timer
                      onComplete={() => { setEnableResendOtp(true); }}
                      maxTime={30}
                    />
                  </>
                )}
              </div>

            </div>


          </div>

        </div>
      )}

      {screen === 'signup' && (

        <div
          className=" md:w-[25rem] md:max-w-[25rem] w-full shadow-2x rounded-[25px] bg-[#f7f7f7] md:max-h-[100vh] overflow-hidden pt-[1rem] pb-[1rem] md:h-[80%] h-auto flex flex-col relative"
        >

          {loading && (
            <div className=" absolute top-0 left-0 w-full h-full bg-[#ffffff85] z-10 flex justify-center items-center">
              <LoadingOutlined size={50} />
            </div>
          )}

          {/* Fixed Header */}
          <div className="px-8 pb-2 flex-shrink-0">
            <div className="text-[#363536] font-semibold ">
              <div className="text-lg mb-1 text-left">Create your account</div>
            </div>

            <div className="text-[#00000099] text-[11px] mt-2 mb-[1rem] ">
              Join us to manage your exhibitor enquiries efficiently.
            </div>
          </div>

          {/* Scrollable Form Section */}
          <div className="flex-1 overflow-y-auto px-8 max-h-fit ">
            <div className="relative">
              <Formik
                className="w-full"
                initialValues={initialValues}
                validationSchema={SignupSchema}
                innerRef={signupFormRef}
                onSubmit={(values: any) => {
                  handleSubmit(values);
                }}
                onKeyDown={(e: any, values: any) => {
                  if (e.key === "Enter") {
                    handleSubmit(values);
                  }
                }}
                name="signupForm"
                id="signupForm"
                autoComplete="on"
              >

                {({ errors, touched, values, setFieldValue }: any) => (
                  <Form>

                    <div className="mb-4">
                      <LabelInput htmlFor="company_name" required>Company Name</LabelInput>
                      <InputCustom
                        id="company_name"
                        name="company_name"
                        type="text"
                        placeholder="Enter Company Name"
                        value={values.company_name}
                        disabled={loading}
                        autoComplete="on"
                        onChange={(e: any) => setFieldValue('company_name', e.target.value)}
                      />
                      {errors.company_name && touched.company_name && <FormError errors={errors.company_name} />}
                    </div>


                    <div className="mb-4">
                      <LabelInput htmlFor="exhibitor_contact_name" required>Exhibitor Contact Name</LabelInput>
                      <InputCustom
                        id="exhibitor_contact_name"
                        name="exhibitor_contact_name"
                        type="text"
                        placeholder="Enter Contact Name"
                        value={values.exhibitor_contact_name}
                        disabled={loading}
                        autoComplete="on"
                        onChange={(e: any) => setFieldValue('exhibitor_contact_name', e.target.value)}
                      />
                      {errors.exhibitor_contact_name && touched.exhibitor_contact_name && <FormError errors={errors.exhibitor_contact_name} />}
                    </div>

                    <div className="mb-4">
                      <LabelInput htmlFor="email" required>Email</LabelInput>
                      <InputCustom
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter Email"
                        value={values.email}
                        disabled={loading}
                        autoComplete="on"
                        onChange={(e: any) => {
                          setFieldValue('email', e.target.value);
                          setEmail(e.target.value);
                        }}
                      />
                      {errors.email && touched.email && <FormError errors={errors.email} />}
                    </div>

                    <div className="mb-4">
                      <LabelInput htmlFor="phone_code" required>Phone Code</LabelInput>
                      <CountrySelect
                        onChangeEvent={(e, value) => {
                          console.log("value", value);
                          setFieldValue('phone_code', value.code);
                          setSelectedCountry(value);
                        }}
                        value={values.phone_code}
                        placeholder="Phone Code"
                        className=" !h-[35px] "
                        name="phone_code"
                        id="phone_code"
                      />
                      {errors.phone_code && touched.phone_code && <FormError errors={errors.phone_code} />}
                    </div>

                    <div className="mb-4">
                      <LabelInput htmlFor="phone" required>Phone Number</LabelInput>
                      <div className="flex items-center gap-2">

                        {/* <div className="w-[35%]">
                          <CountrySelect
                            onChangeEvent={(e, value) => {
                              console.log("value", value);
                              setFieldValue('phone_code', value.code);
                              setSelectedCountry(value);
                            }}
                            value={values.phone_code}
                            placeholder="Phone Code"
                            className=" !h-[35px] "
                            name="phone_code"
                            id="phone_code"
                          />
                        </div> */}

                          <InputCustom
                            id="phone"
                            name="phone"
                            type="number"
                            placeholder="Enter Phone Number"
                            value={values.phone}
                            disabled={loading}
                            autoComplete="on"
                            onChange={(e: any) => setFieldValue('phone', e.target.value)}
                            prefix={<PhoneOutlined className="text-gray-500 border-r-2 border-gray-500 pr-2" />}
                          />
                      </div>
                      {errors.phone && touched.phone && <FormError errors={errors.phone} />}
                    </div>


                    <div className="mb-4">
                      <LabelInput htmlFor="invoice_address" >Invoice Address</LabelInput>
                      <InputCustom
                        id="invoice_address"
                        name="invoice_address"
                        type="text"
                        placeholder="Enter Invoice Address"
                        value={values.invoice_address}
                        disabled={loading}
                        autoComplete="on"
                        onChange={(e: any) => setFieldValue('invoice_address', e.target.value)}
                      />
                      {errors.invoice_address && touched.invoice_address && <FormError errors={errors.invoice_address} />}
                    </div>

                    <div className="mb-4">
                      <LabelInput htmlFor="accounts_email" >Accounts Email</LabelInput>
                      <InputCustom
                        id="accounts_email"
                        name="accounts_email"
                        type="email"
                        placeholder="Enter Email"
                        value={values.accounts_email}
                        disabled={loading}
                        autoComplete="on"
                        onChange={(e: any) => setFieldValue('accounts_email', e.target.value)}
                      />
                      {errors.accounts_email && touched.accounts_email && <FormError errors={errors.accounts_email} />}
                    </div>

                    {/* <div className="mb-4">
                    <ConfigProvider locale={countryPhoneLocale("en")}>
                      <CountryPhoneCode
                        inputProps={{ placeholder: "Please input phone number" }}
                      />
                    </ConfigProvider>
                  </div> */}


                    <div className="mb-4">
                      <LabelInput htmlFor="vat_number" >VAT Number</LabelInput>
                      <InputCustom
                        id="vat_number"
                        name="vat_number"
                        type="text"
                        placeholder="Enter VAT Number"
                        value={values.vat_number}
                        disabled={loading}
                        autoComplete="on"
                        onChange={(e: any) => setFieldValue('vat_number', e.target.value)}
                      />
                      {errors.vat_number && touched.vat_number && <FormError errors={errors.vat_number} />}
                    </div>


                    <div className="mb-4">
                      <LabelInput htmlFor="password" required>Password</LabelInput>
                      <InputCustom
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter Password"
                        value={values.password}
                        disabled={loading}
                        autoComplete="on"
                        onChange={(e: any) => setFieldValue('password', e.target.value)}
                        prefix={<LockOutlined className="text-gray-500 border-r-2 border-gray-500 pr-2" />}
                        suffix={
                          showPassword ?
                            <EyeInvisibleOutlined
                              className="cursor-pointer"
                              onClick={() => setShowPassword(!showPassword)}
                            />
                            :
                            <EyeOutlined
                              className="cursor-pointer"
                              onClick={() => setShowPassword(!showPassword)}
                            />
                        }
                      />
                      {errors.password && touched.password && <FormError errors={errors.password} />}
                    </div>

                    <div className="mb-4">
                      <LabelInput htmlFor="confirm_password" required>Confirm Password</LabelInput>
                      <InputCustom
                        id="confirm_password"
                        name="confirm_password"
                        type="password"
                        placeholder="Enter Confirm Password"
                        value={values.confirm_password}
                        disabled={loading}
                        autoComplete="on"
                        onChange={(e: any) => setFieldValue('confirm_password', e.target.value)}
                      />
                      {errors.confirm_password && touched.confirm_password && <FormError errors={errors.confirm_password} />}
                    </div>

                  </Form>
                )}
              </Formik>
            </div>
          </div>

          {/* Fixed Footer */}
          <div className="px-8 pt-4 flex-shrink-0">
            <ButtonSimple
              className=" py-3 hover:bg-[#283141] !bg-[#425468] !text-white !hover:text-white !focus:text-white mt-5"
              htmlType="submit"
              disabled={loading}
              onClick={() => { signupFormRef.current?.handleSubmit(); }}
            >
              <p className=" m-0 p-0 text-[14px] uppercase "> {loading ? 'Signing Up...' : 'SIGN UP'}</p>
            </ButtonSimple>

            <div className="text-center mt-6 text-xs text-gray-500 flex ">
              Do you have an account?{' '}
              <a
                className="text-red-700 font-semibold hover:underline focus:outline-none"
                href="/login"
              >
                <p className=" m-0 p-0 text-[14px] mx-1 ">Login</p>
              </a>{' '}here
            </div>
          </div>

        </div>
      )}
    </AuthUi>

  );
};

export default Signup; 