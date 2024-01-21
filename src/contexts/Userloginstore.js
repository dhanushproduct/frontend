import { logincontext } from "./Logincontext";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import apiUrl from "../apiConfig";

function Userloginstore({ children }) {
  const [currentuser, setcurrentuser] = useState({});
  const [loginerror, setloginerror] = useState("");
  const [UserloginStatus, setUserloginStatus] = useState(false);
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const Loginuser = (userobj) => {
    //console.log(userobj);
    //make http post request to server new user to local api
    axios
      .post(apiUrl.login, userobj)
      .then((response) => {
        //  //console.log(response.message)
        if (response.status === 200) {
          setUserloginStatus(true);
          setloginerror("");
          let token = response.data.token;
          localStorage.setItem("token", token);
          localStorage.setItem("type", response.data.type);
          // // Hash the user ID
          // const id = response.data.user._id;
          // const hashedId = bcrypt.hashSync(id, 10); // You can adjust the number of salt rounds
          // const hashedIdWithoutSlashes = hashedId.replace(/\//g, '');

          // Store the hashed ID in local storage
          // toast.success("Login successfull!!")
          navigate(`/dashboard/${token}`);
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 404) {
            // toast('Enter correct mail id')
            toast.error("Enter correct mail id");
          } else if (err.response.status === 401) {
            // toast('Enter correct password')
            toast.error("Enter correct password");
          } else {
            // toast('Login Error')
            toast.error("Login error");
            setloginerror(err.response.data.message);
          }
        } else {
          toast.error("Unexpected Error");
        }
      });
  };

  const VerifyOTP = (userobj, writtenOtp) => {
    //console.log(userobj);
    //console.log(writtenOtp);
    if (writtenOtp === otp) {
      //make http post request to server new user to local api
      axios
        .post(apiUrl.verifyotp, userobj)
        .then((response) => {
          //  //console.log(response.message)
          if (response.status === 200) {
            //console.log(response.data);
            const token = response.data.token;
            localStorage.setItem("token", token);
            navigate(`/profile/page0/${token}`);
            window.scroll(0, 0);
            toast.success("Account verified successfully!!!")
          }
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.status === 401) {
              toast.warn("Account with this mail id already exists");
            } else {
              toast.error(err.response.data.message);
              setloginerror(err.response.data.message);
            }
          } else {
            toast.error("Unexpected Error");
          }
        });
    } else {
      toast.error("Enter Correct OTP");
    }
  };

  const VerifyForgotPasswordOTP = (userobj, writtenOtp) => {
    //console.log(userobj);
    //console.log(writtenOtp);
    if (writtenOtp === otp) {
      return true;
    }
    else{
      return false;
    }
  };

  const Signupuser = async (userobj) => {
    //console.log(userobj);
    //make http post request to server new user to local api

    // request otp
    axios
      .post(apiUrl.usersignup, userobj)
      .then((response) => {
        //  //console.log(response.message)
        
        if (response.status === 200) {
          console.log(response.data);
          setOtp(response.data.otp);
          toast.success("OTP successfully sent");
          return response.data;
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 401) {
            toast.warn("Account with this mail id already exists");
            setloginerror(err.response.data.message);
          } else {
            toast(err.response.data.message);
            setloginerror(err.response.data.message);
          }
        } else {
          toast.error("Unexpected Error");
        }
      });
  };

  const Signupadmin = (userobj) => {
    //console.log(userobj);
    //make http post request to server new user to local api
    axios
      .post(apiUrl.adminsignup, userobj)
      .then((response) => {
        //  //console.log(response.message)
        if (response.status === 200) {
          setcurrentuser(response.data.admin.username);
          setUserloginStatus(true);
          setloginerror("");
          localStorage.setItem("token", response.data.token);
          const id = response.data.admin._id;
          localStorage.setItem("id", id);
          navigate(`/admindashboard/${id}`);
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 400) {
            toast.warn("Username already exists");
          } else {
            toast.error("Login Error");
            setloginerror(err.response.data.message);
          }
        } else {
          toast.error("Unexpected Error");
        }
      });
  };
  const Logoutuser = () => {
    toast.success("You have succesfully logged out");
    localStorage.clear();
    setUserloginStatus(false);
    navigate("/");
  };
  return (
    <logincontext.Provider
      value={[
        currentuser,
        loginerror,
        UserloginStatus,
        Loginuser,
        Signupuser,
        VerifyOTP,
        VerifyForgotPasswordOTP,
        Signupadmin,
        Logoutuser,
      ]}
    >
      {children}
    </logincontext.Provider>
  );
}
export default Userloginstore;
