import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';

import AuthUi from '@/container/AuthUi';

import { LabelInput, FormError } from '@/components/LabelInput';
import InputCustom from '@/components/InputCustom';
import ButtonSimple from '@/components/ButtonSimple';
import InputOtp from '@/components/InputOtp';

import { logHelper } from '@/utils';
import { EmailSchema, PasswordSchema } from '@/yupschema/auth.schema';
import { useResetPasswordMutation, useSendOtpMutation } from '@/services/service';
import { EyeInvisibleOutlined, EyeOutlined, LoadingOutlined, LockOutlined } from '@ant-design/icons';
import { useAppNotification } from '@/hooks/useAppNotification';

const TAG: string = 'ForgotPassword:';
const ForgotPassword: React.FC = () => {

  const navigate = useNavigate();
  const { errorToast, successToast } = useAppNotification();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [screen, setScreen] = useState<string>('forgot');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string>("");

  const initialValues = {
    email: '',
  };

  const {
    mutate: resetPassword
  } = useResetPasswordMutation();

  const {
    mutate: forgotPassword
  } = useSendOtpMutation();

  const handleSubmit = (values: any) => {

    logHelper(TAG, 'handleSubmit', values);
    setLoading(true);

    forgotPassword(values, {
      onSuccess: (data) => {
        logHelper(TAG, 'handleSubmit', data);

        if (data?.status !== 200 || data?.data?.statusCode !== 200 || data?.data?.status !== 'success') {
          errorToast(data?.data?.errorMessage || 'Something went wrong');
          return;
        }

        setEmail(values.email);
        setScreen('verify');

      },
      onError: (error: any) => {
        logHelper(TAG, ' handleSubmit error ', error);
        errorToast(error?.response?.data?.errorMessage || 'Something went wrong');
      },
      onSettled: () => {
        setLoading(false);
      }
    });

  };

  const handleVerifyOtp = () => {

    logHelper(TAG, 'handleVerifyOtp', { otp, password });

    if (otp?.length !== 6) {
      errorToast("OTP must be 6 digits");
      return;
    }

    if (password?.length < 8) {
      setErrors("Password must be at least 8 characters");
      return;
    }

    PasswordSchema.validate({ password: password }).then((data: any) => {

      logHelper(TAG, ' PasswordSchema success ', data);
      setErrors("");
      setLoading(true);
      handleResetPassword();

    }).catch((error: any) => {
      logHelper(TAG, ' PasswordSchema error ', error);
      setErrors(error?.errors[0]);
    });

    logHelper(TAG, " verification success ", "");


  };


  const handleResetPassword = () => {

    const payload = { otp_code: otp, new_password: password, email: email };

    // logHelper(TAG, 'handleResetPassword', payload);

    resetPassword(payload, {
      onSuccess: (data) => {

        // logHelper(TAG, 'handleResetPassword', data);

        if (data?.status !== 200 || data?.data?.statusCode !== 200 || data?.data?.status !== 'success') {
          errorToast(data?.data?.errorMessage || 'Something went wrong');
          return;
        }

        successToast(data?.data?.message || 'Password reset successfully');
        navigate('/login');

      },
      onError: (error: any) => {
        logHelper(TAG, ' error', error);
        errorToast(error?.response?.data?.errorMessage || 'Something went wrong');
      },
      onSettled: () => {
        setLoading(false);
      }
    });
  }

  return (
    <AuthUi>
      <div
        className=" md:w-[25rem] md:max-w-[25rem] w-full shadow-2x rounded-[25px] md:bg-[#f7f7f7] bg-[#f3f3f4b8] md:max-h-[100vh] overflow-hidden pt-[1rem] pb-[1rem] md:h-[450px] h-auto "
      >

        {screen === 'forgot' && (
          <div className="h-full overflow-y-auto px-8">
            <div className=" text-[#363536] font-semibold  ">
              <div className="text-lg mb-1 text-left">Forgot Password</div>
            </div>

            <div className="text-[#00000099] text-[11px] mb-10">
              Enter your registered email address to receive a one-time password (OTP) for verification.
            </div>

            <div className="w-full relative">
              {loading && (
                <div className=" absolute top-0 left-0 w-full h-full bg-[#ffffff85] z-10 flex justify-center items-center">
                  <LoadingOutlined size={50} />
                </div>
              )}
              <Formik
                className="w-full "
                initialValues={initialValues}
                validationSchema={EmailSchema}
                onSubmit={(values: any) => {
                  handleSubmit(values);
                }}
                onKeyDown={(e: any, values: any) => {
                  if (e.key === "Enter") {
                    // handleSubmit(values);
                  }
                }}
                name="forgotPasswordForm"
                id="forgotPasswordForm"
                autoComplete="on"
              >

                {({ errors, touched, values, setFieldValue }: any) => (
                  <Form>
                    <div className="mb-4">
                      <LabelInput htmlFor="email" required>Email Address</LabelInput>
                      <InputCustom
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={values.email}
                        disabled={loading}
                        autoComplete="on"
                        onChange={(e: any) => { setFieldValue('email', e.target.value) }}
                      />
                      {errors.email && touched.email && <FormError errors={errors.email} />}
                    </div>

                    <div className="text-[#00000099] text-[11px] mt-4 ">
                      After submitting, check your inbox for an email containing your OTP.
                    </div>

                    <ButtonSimple
                      className=" py-3 hover:bg-[#283141] !bg-[#425468] !text-white !hover:text-white !focus:text-white mt-5"
                      htmlType="submit"
                      disabled={loading}
                    >
                      <p className=" m-0 p-0 text-[14px] uppercase "> {loading ? 'Signing OTP...' : 'Send OTP'}</p>
                    </ButtonSimple>

                  </Form>
                )}
              </Formik>
            </div>


            <div className="md:flex justify-between mt-5 block">
              <div className="text-[#00000099] text-[11px]"> Remember your password? </div>
              <div>
                <a href="/login">
                  <p className="text-red-700 text-[13px] font-semibold hover:underline focus:outline-none">BACK TO LOGIN</p>
                </a>
              </div>
            </div>


            <div className="text-center mt-6 text-xs text-gray-500 flex ">
              Don’t you have an account yet?{' '}
              <a
                className="text-red-700 font-semibold hover:underline focus:outline-none flex"
                href="/signup"
              >
                <span className=" m-0 p-0 text-[14px] shrink-0 "> &nbsp;Sign up &nbsp; &nbsp; </span>
              </a> here
            </div>

          </div>
        )}

        {screen === 'verify' && (
          <div className="h-full overflow-y-auto px-8">
            <div className="text-[#363536] font-semibold ">
              <div className="text-lg mb-1 text-left">Verification</div>
            </div>

            <div className="text-[#00000099] text-[11px] mt-2 mb-[1rem] "> Please enter the One-Time Password to verify your account   </div>

            <div className="text-[#00000099] text-[14px] mt-2 mb-[1rem] text-center font-semibold ">
              <p className="mb-1">A One-Time Password has been sent to</p>
              <p className="">{email}</p>
            </div>

            <div className="relative">

              <form autoComplete="off" >

                <div className="flex justify-center mt-5">
                  <InputOtp
                    onChange={(text: any) => { setOtp(text); }}
                    onInput={(value: any) => { setOtp(value); }}
                    inputMode="numeric"
                    length={6}
                    id="randomp"
                    autoFocus={true}
                    type="number"
                  />
                </div>

                <div className="mb-4 mt-2">
                  <LabelInput htmlFor="pswRandom" required>Password </LabelInput>
                  <InputCustom
                    id="pswRandom"
                    name="pswRandom"
                    type={showPassword ? 'text' : 'password'}
                    // type="text"
                    placeholder="Enter Password"
                    value={password}
                    disabled={loading}
                    autoComplete="off"
                    onChange={(e: any) => setPassword(e.target.value)}
                    prefix={<LockOutlined className="text-gray-500 border-r-2 border-gray-500 pr-2" />}
                    suffix={
                      showPassword ?
                        <EyeOutlined
                          className="cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                        :
                        <EyeInvisibleOutlined
                          className="cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                    }
                  />
                  {errors && <FormError errors={errors} />}
                </div>

              </form>

              <ButtonSimple
                className=" py-3 hover:bg-[#283141] !bg-[#425468] !text-white !hover:text-white !focus:text-white mt-5"
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

            </div>

            {/* <p className="text-center text-[#BE0000] text-[11px] mt-5 cursor-pointer hover:underline">Resend one-time password</p> */}
            <Link to="/login">
              <p className="text-center text-[#BE0000] text-[11px] mt-4 cursor-pointer hover:underline">Back to login</p>
            </Link>

          </div>
        )}

      </div>
    </AuthUi>
  );
};

export default ForgotPassword; 