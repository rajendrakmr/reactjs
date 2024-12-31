import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";

// For Registration
import RegCertificate from "../pages/registration/RegCertificate";

// For Examination
import Display_marks from "../pages/examination/Display_marks";
import Exam_enrollment from "../pages/examination/Exam_enrollment";
import Admit_card from "../pages/examination/Admit_card";
import PrivateRoute from "../navigation/Private/PrivateRoute";
import Dashboard from "../pages/Dashboard";
import Login from "../screen/Login/Login";


function AppNav() {
  
  
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public route (Login) */}
          <Route index path="/dashboard" element={<Dashboard />}  />
          {/* <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} /> */}
          <Route path="/student/registration-certificate" element={<PrivateRoute element={<RegCertificate />} />} />
          <Route path="/student/display-marks" element={<PrivateRoute element={<Display_marks />} />} />
          <Route path="/student/exam-enrollment"element={<PrivateRoute element={<Exam_enrollment />} />} />
          <Route path="/student/admit-card" element={<PrivateRoute element={<Admit_card />} />}/>
        </Routes>
      </Layout>
    </Router>
  );
}

export default AppNav;
