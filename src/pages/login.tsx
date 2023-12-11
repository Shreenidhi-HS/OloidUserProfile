import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailSchema } from "../schema/email-schema";
import { useMutation } from "react-query";
import { LoginApi, getUserData, otpLoginApi } from "../services/login";
import { LoginContext } from "../App";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/animation/idealLockScan/idealLockScan.json";
import Button from "../components/ui/button";

const Login: React.FC = () => {
  const lottieRef = useRef(null);
  const [login, setLogin] = useState(false);
  const [otp, setOtp] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(3);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { authContext, setAuthContext } = useContext(LoginContext);

  const loginMutation = useMutation(LoginApi, {
    onSuccess: (loginData) => {
      setLogin(true);
      const newAuthContext = {
        Code: otp,
        Session: loginData.data.Session,
        Tenant: "lift",
        Email: loginData.data.Email,
      };
      setAuthContext(newAuthContext);
      localStorage.setItem("authContext", JSON.stringify(newAuthContext));
    },
    onMutate: () => {
      setLoading(true);
    },
    onError: () => {
      // toast({
      //     title: "Uh oh! Something went wrong.",
      //     description: "There was a problem with saving your default location.",
      //     variant: "destructive"
      // })
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const otpMutation = useMutation(otpLoginApi, {
    onSuccess: async (result) => {
      if (
        result.data &&
        result.data.CognitoToken.AuthenticationResult &&
        result.data.CognitoToken.AuthenticationResult.IdToken
      ) {
        const idToken = result.data.CognitoToken.AuthenticationResult.IdToken;
        // sessionStorage.setItem('token', idToken);
        const tokenData = {
          ...authContext,
          token: idToken,
        };
        setAuthContext(tokenData);
        localStorage.setItem("authContext", JSON.stringify(tokenData));
        const userDetail = await getUserData(idToken);
        const newAuthContext = {
          ...authContext,
          token: idToken,
          userDetail: userDetail.data.user,
        };
        setAuthContext(newAuthContext);
        localStorage.setItem("authContext", JSON.stringify(newAuthContext));
        navigate("/credentials");
      } else {
        if (loginAttempts >= 1) {
          const attemptsLeft = loginAttempts - 1;
          setLoginAttempts(attemptsLeft);
          setError(`Invalid Code, ${loginAttempts} attempts left!`);
        } else {
          alert("Login Failed! You've made 3 unsuccessful attempts!");
          setLogin(false);
        }
      }
    },
    onMutate: () => {
      setLoading(true);
    },
    onError: () => {
      // toast({
      //     title: "Uh oh! Something went wrong.",
      //     description: "There was a problem with saving your default location.",
      //     variant: "destructive"
      // })
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  useEffect(() => {
    const storedAuthContext = localStorage.getItem("authContext");
    if (storedAuthContext) {
      const parsedAuthContext = JSON.parse(storedAuthContext);
      setAuthContext(parsedAuthContext);
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(EmailSchema),
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: any, e) => {
    e.preventDefault();
    loginMutation.mutate({ Email: data.email, Tenant: "lift" });
  };

  const handleOtp = (otpValue: string) => {
    const numericOtp = otpValue.replace(/[^0-9]/g, "");
    setOtp(numericOtp);
  };

  const handleOtpLogin = async () => {
    try {
      if (!otp || otp.length < 6) {
        setError("Not a valid entry");
      } else {
        otpMutation.mutate({ ...authContext, Code: otp });
      }
    } catch (error) {
      setError("Failed to log in with OTP.");
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center m-auto max-w-[26.875rem] shadow-lg">
        <div className="bg-[#272727] w-full mt-0 flex flex-col items-start">
          <img
            src="/assets/logo.svg"
            className="w-full h-[65.51px] text-center mt-[1.563rem]"
            alt=""
          />
        </div>
        <div className="bg-[#272727] w-full">
          {!login ? (
            <div className="rounded-t-[16px] bg-white">
              <div className="flex flex-col items-center gap-[1.563rem] mt-[1.313rem]">
                <div className="w-[7.5rem] mt-12">
                  <Lottie
                    animationData={loadingAnimation}
                    lottieRef={lottieRef}
                    loop
                    autoPlay
                  />
                </div>
                <p className="font-avenirHeavy text-[1.5rem]">OloID Portal</p>
              </div>

              <div className="flex justify-center mt-[3.063rem]">
                <form
                  className="flex flex-col w-[342px]"
                  noValidate
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="flex flex-col">
                    <label
                      htmlFor="email"
                      className="text-[#1A2F47] text-base font-avenirHeavy"
                    >
                      Email Address
                    </label>
                    <input
                      placeholder="Type Email ID"
                      className="p-4 bg-[#FFFFFF] border-[1px] border-[#272727] rounded-lg mt-[0.688rem] font-avenirMedium text-base"
                      id="email"
                      required
                      {...register("email")}
                      style={{ outline: "none" }}
                    />
                    {errors.email && (
                      <p className="text-[#D0390B] font-avenirMedium mt-2 text-sm">
                        {errors.email?.message}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="mt-[1.875rem]"
                    text="Get Verification Code"
                    variant="primary"
                    showLoad={loading}
                  />

                  <div className="flex mt-[24px] gap-2 items-center">
                    <span className="h-[1px] w-[50%] bg-[#D0D5DD]"></span>
                    <p className="font-avenirHeavy text-sm text-[#101828BF]">
                      OR
                    </p>
                    <span className="h-[1px] w-[50%] bg-[#D0D5DD]"></span>
                  </div>

                  <Button
                    className="mt-[1.875rem]"
                    variant="secondary"
                    icon="../../public/assets/login/powerIcon.svg"
                    text="Login with SSO"
                  />

                  <Button
                    className="mt-[1.875rem]"
                    variant="secondary"
                    icon="../../public/assets/login/powerIcon.svg"
                    text="Supervisor Assisted Login"
                  />
                </form>
              </div>
              <footer className="bg-[#000000] mt-[3.938rem] px-6 py-4 w-full flex justify-between items-center">
                <img src="/assets/footerLogo.svg" alt="" />

                <img src="/assets/footerArrow.svg" alt="arrow" />
              </footer>
            </div>
          ) : (
            <div className="flex flex-col gap-10 m-11 text-center">
              <div className="flex flex-col items-center gap-[1.125rem]">
                <h2 className="font-avenirHeavy text-[1.625rem] text-[#101828]">
                  Enter Verification Code
                </h2>
                <p className="font-avenirMedium text-base text-[#667085] max-w-[18.313rem]">
                  Enter the One Time Verification Code we just sent to your
                  email
                </p>
              </div>
              <div className="flex flex-col items-center gap-[1.875rem] text-xl font-avenirMedium">
                <div>
                  <OtpInput
                    value={otp}
                    onChange={handleOtp}
                    numInputs={6}
                    inputStyle={{
                      border: "1.5px solid #D0D5DD",
                      borderRadius: "8px",
                      width: "56px",
                      height: "56px",
                      outlineColor: "#0B6FD0",
                    }}
                    inputType="number"
                    renderInput={(props, index) => (
                      <React.Fragment key={index}>
                        <input {...props} />
                        {index < 5 && <span className="me-1"></span>}
                      </React.Fragment>
                    )}
                  />
                  {error && <p className="text-[red] mt-2 text-md">{error}</p>}
                </div>
                <Button
                  text="Login"
                  variant="primary"
                  showLoad={loading}
                  onClick={handleOtpLogin}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
