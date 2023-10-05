import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailSchema } from "../schema/email-schema";
import { useMutation } from "react-query";
import { LoginApi, getUserData, otpLoginApi } from "../services/login";
import { LoginContext } from "../App";

function Login() {
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
          token:idToken,
        };
        setAuthContext(tokenData);
        localStorage.setItem("authContext", JSON.stringify(tokenData));
        const userDetail = await getUserData(idToken);
        const newAuthContext = {
          ...authContext,
          token:idToken,
          userDetail: userDetail.data.user,
        };
        setAuthContext(newAuthContext);
        localStorage.setItem("authContext", JSON.stringify(newAuthContext));
        navigate("home/profile");
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
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldFocusError: true,
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
    <div className="bg-[#272727] h-screen mt-0 flex flex-col items-start md:bg-white">
      <h2 className="text-white text-[50px] font-bold m-auto md:hidden mt-10">OLOID</h2>
    <div className="flex flex-col items-center w-full h-full p-[24px] rounded-t-[30px] md:rounded-[12px] mt-[10%] md:shadow-lg md:w-[32rem] md:h-fit m-auto md:mt-[5%] bg-white">
      {!login ? (
        <>
          <h2 className="text-2xl font-bold text-[#1A2F47] mt-8 md:mt-0">
            Login to your
          </h2>
          <h1 className="text-[28px] font-bold text-[#1A2F47] mt-2">
            OLOID Dashboard
          </h1>
          <p className="text-[#7D7D7D] text-sm mt-2">
            A link will be sent to your email
          </p>
          <div className="mt-[64px] w-full">
            <form
              className="flex flex-col m-auto"
              onSubmit={handleSubmit(onSubmit)}
            >
              <label
                htmlFor="email"
                title="must be valid email"
                className="text-[#1A2F47] text-md font-bold"
              >
                Email Address*
              </label>
              <input
                placeholder="Type Email ID here..."
                className="p-4 border-[1px] border-[#B0B0B0] rounded mt-2"
                id="email"
                {...register("email")}
              />
              {errors.email?.message && (
                <p className="text-[red] mt-2 text-md">
                  {errors.email?.message}
                </p>
              )}
              <button
                type="submit"
                className="text-lg font-semibold mt-10 w-full bg-[black] p-[16px] rounded-[0.5rem] text-white"
              >
                {loading ? <img src="../../public/assets/loader.svg" className=" animate-spin m-auto" height={24} width={24} alt="loader" /> : "Next"} 
              </button>
              <div className="flex w-full mt-[24px] gap-2 items-center">
                <span className="h-[1px] w-[50%] bg-[black]"></span>
                <div>Or</div>
                <span className="h-[1px] w-[50%] bg-[black]"></span>
              </div>

              <button
                type="button"
                className="text-[#1A2F47] flex flex-row items-center justify-center gap-4 text-lg font-semibold w-full bg-[white] border-[black] border-[1px] p-[16px] rounded-[0.5rem] text-black mt-[24px]"
                onClick={handleOtpLogin}
              >
                <img
                  src="../../public/assets/login/powerIcon.svg"
                  alt="powericon"
                  className="h-6 w-6"
                />{" "}
                Login with SSO
              </button>
            </form>
          </div>
        </>
      ) : (
        <>
          <h2 className="font-bold text-lg">Enter your OTP</h2>
          <span>We have sent you an OTP to your Email</span>
          <div className="mt-8">
            <OtpInput
              value={otp}
              onChange={handleOtp}
              numInputs={6}
              inputStyle={{
                border: "1px solid black",
                borderRadius: "8px",
                width: "54px",
                height: "54px",
                fontSize: "12px",
                color: "#000",
                fontWeight: "400",
                caretColor: "blue",
              }}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
            />
            {error && <p className="text-[red] mt-2 text-md">{error}</p>}
          </div>
          <button
            type="button"
            className="mt-10 w-full bg-[black] p-[16px] rounded text-white"
            onClick={handleOtpLogin}
          >
             {loading ? <img src="../../public/assets/loader.svg" className=" animate-spin m-auto" height={24} width={24} alt="loader" /> : "Login"} 
          </button>

        </>
      )}
    </div>
    </div>
  );
}

export default Login;
