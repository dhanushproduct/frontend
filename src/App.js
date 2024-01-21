import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Headroom from "react-headroom";
import React from 'react';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile1 from "./components/Profiles/Profile1";
import Profileincom from "./pages/Profileincom";
import Profile2 from "./components/Profiles/Profile2";
import Profile3 from "./components/Profiles/Profile3";
import Profile4 from "./components/Profiles/Profile4";
import Profile5 from "./components/Profiles/Profile5";
import Educationreview from "./components/Educationreview"
import JobReview from "./components/JobReview";
import Profile6 from "./components/Profiles/Profile6";
import Profile7 from "./components/Profiles/Profile7";
import Profile8 from "./components/Profiles/Profile8";
import Profile9 from "./components/Profiles/Profile9";
import Profile4_1 from "./components/Profiles/Profile4_1";
import ProjectReview from "./components/ProjectReview";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfileSocial from "./components/Profiles/ProfileSocial";
import Profile0 from "./components/Profiles/Profile0";
import ForgotPassword from "./pages/ForgotPassword";
// import Dashboard1 from "./pages/Dashboard1";
import ViewResume from "./pages/ViewResume";
export default function App() {
 
  const formdetails = {};

  return (
    <div className=" min-h-screen w-full min-w-[425px]">
      <div>
        <Headroom >
          <Navbar />
        </Headroom>
      </div>
      
      <div className="">
        <Routes>
          <Route element={<Landing />} path="/" />
          <Route element={<Signup />} path="/signup" />
          <Route element={<Login />} path="/login" />
          <Route element={<ForgotPassword />} path="/forgotpassword" />
          <Route element={<Profileincom />} path="/profile" >
          <Route path="page0/:id" element={<Profile0 />}  />
          <Route path="page1/:id" element={<Profile1 formdetails={formdetails}/>}  />
          <Route path="page2/:id" element={<Profile2 formdetails={formdetails}/>} />
          <Route path="page3/:id" element={<Profile3 formdetails={formdetails}/>} />
          <Route path="page4/:id" element={<Profile4 formdetails={formdetails}/>} />
          <Route path="education-review/:id" element={<Educationreview  formdetails={formdetails}/>}/>
          <Route path="page4-1/:id" element={<Profile4_1  formdetails={formdetails}/>}/>
          <Route path="project-review/:id" element={<ProjectReview  formdetails={formdetails}/>}/>
          <Route path="page5/:id" element={<Profile5 formdetails={formdetails}/>} />
          <Route path="job-review/:id" element={ <JobReview  formdetails={formdetails}/> } />
          <Route path="page6/:id" element={ <Profile6  formdetails={formdetails}/> } />
          <Route path="page7/:id" element={ <Profile7  formdetails={formdetails}/> } />
          <Route path="page7-1/:id" element={ <ProfileSocial  formdetails={formdetails}/> } />
          <Route path="page8/:id" element={ <Profile8  formdetails={formdetails}/> } />
          <Route path="page9/:id" element={ <Profile9  formdetails={formdetails}/> } />
          </Route>
          <Route element={<Dashboard formdetails={formdetails}/>} path="/dashboard/:id" />
          <Route element={<ViewResume formdetails={formdetails}/>} path="/resume/:id" />
          <Route element={<Landing />} path="*" />
        </Routes>
      </div>
      <Footer />
      <ToastContainer/>
    </div>
  );
}
