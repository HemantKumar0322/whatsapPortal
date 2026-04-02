import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { EyeOutlined, LoadingOutlined, LockOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

import { LabelInput, FormError } from '@/components/LabelInput';
import InputCustom from '@/components/InputCustom';
import ButtonSimple from '@/components/ButtonSimple';

import AuthUi from '@/container/AuthUi';

import { logHelper } from '@/utils';
import { LoginSchema } from '@/yupschema/auth.schema';
import { useLoginMutation } from '@/services/service';
import { useAppNotification } from '@/hooks/useAppNotification';

const TAG: string = 'Login:';
const Login: React.FC = () => {

  const navigate = useNavigate();
  const { errorToast, successToast } = useAppNotification();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const initialValues = {
    email: '',
    password: '',
  };

  const {
    mutate: loginCall
  } = useLoginMutation();

  const handleSubmit = async (values: any) => {

    logHelper(TAG, ' ==> handleSubmit ', values);
    setLoading(true);

    const credentials: any = {
      email: values.email,
      password: values.password,
      role: "admin"
    };

    loginCall(credentials, {
      onSuccess: (response) => {

        logHelper(TAG, ' ===> onsuccess ', response);

        if (response?.status !== 200 && response?.data?.data?.success !== true) {
          errorToast(response?.data?.message || 'Something went wrong');
          return;
        };

        localStorage.setItem('token', response?.data?.data?.token?.token);
        localStorage.setItem('user', JSON.stringify(response?.data?.data?.user));

        successToast(response?.data?.data?.message || 'Login successfully');
        navigate('/');

      },
      onError: (error: any) => {
        // logHelper(TAG, ' ===> onerror ', error);
        errorToast(error?.data?.message || 'Something went wrong');

      },
      onSettled: () => {
        setLoading(false);
      }
    });


  };

  return (

    <AuthUi>
      <div
        className=" md:w-[25rem] md:max-w-[25rem] w-full shadow-2x rounded-[25px] md:bg-[#f7f7f7] bg-[#f3f3f4b8] md:max-h-[100vh] overflow-hidden pt-[1rem] pb-[1rem] md:h-[65%] h-auto "
      >

        <div className="h-full overflow-y-auto px-8">
          <div className="mb-8 text-[#363536] font-semibold mt-[4rem] ">
            <div className="text-lg mb-1 text-left">Welcome to</div>
            <div className="text-lg mb-2">UPURCHASE</div>
          </div>

          <div className="relative">

            <Formik
              className="w-full"
              initialValues={initialValues}
              validationSchema={LoginSchema}
              onSubmit={(values: any) => {
                handleSubmit(values);
              }}
              onKeyDown={(e: any, values: any) => {
                if (e.key === "Enter") {
                  handleSubmit(values);
                }
              }}
              name="loginForm"
              id="loginForm"
              autoComplete="off"
            >

              {({ errors, touched, values, setFieldValue }: any) => (
                <Form>
                  <div className="mb-4">
                    <LabelInput htmlFor="email" required>User Name</LabelInput>
                    <InputCustom
                      id="email"
                      name="email"
                      type="email"
                      placeholder="example@gmail.com"
                      value={values.email}
                      disabled={loading}
                      autoComplete="off"
                      onChange={(e: any) => setFieldValue('email', e.target.value)}
                    />
                    {errors.email && touched.email && <FormError errors={errors.email} />}
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

                  <div className="flex items-center justify-between mb-6 mt-4 ">
                    <div />
                    <Link to="/forgot-password">
                      <p className="text-xs font-semibold hover:underline focus:outline-none"> FORGOT PASSWORD </p>
                    </Link>
                  </div>

                  <ButtonSimple
                    className=" py-3 hover:bg-[#283141] !bg-[#425468] !text-white !hover:text-white !focus:text-white "
                    htmlType="submit"
                    disabled={loading}
                  >
                    <p className=" m-0 p-0 text-[14px] uppercase "> {loading ? 'Signing In...' : 'LOGIN'}</p>
                  </ButtonSimple>

                </Form>
              )}
            </Formik>

            {loading && (
              <div className="absolute top-0 left-0 w-full h-full bg-[#ffffff85] z-10 flex justify-center items-center">
                <LoadingOutlined size={50} />
              </div>
            )}
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
      </div>
    </AuthUi>

  );
};

export default Login; 