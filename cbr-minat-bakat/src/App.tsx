/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/layout/Layout";
import { OptionSelector } from "./components/OptionSelector";
import AdminLoginForm from "./components/UserForm/AdminLogin";
import Result from "./components/Result";
import Dashboard from "./pages/Dashboard";
// import OptionSelector from "./components/OptionSelector";

function App() {
  useEffect(() => {
    console.log("Hello World...");
  }, []);
  
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/form" element={<OptionSelector />}></Route>
        <Route path="/admin" element={<AdminLoginForm />}></Route>
        <Route path="/result" element={<Result />}></Route>
        <Route path="/consultation-results" element={<Dashboard />}></Route>
      </Routes>
    </Layout>
  )
}

export default App
