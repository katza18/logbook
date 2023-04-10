import React from "react";
import LogsPage from "../pages/LogsPage";
import LoginPage from '../pages/LoginPage';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import RequireAuth from "./Accounts/RequireAuth";
import SignupPage from "../pages/SignupPage";
import LogoutPage from "../pages/LogoutPage";
import WorkoutsPage from "../pages/WorkoutsPage";
import MealsPage from '../pages/MealsPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import BuildPage from "../pages/BuildPage";
import AccountPage from "../pages/AccountPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<RequireAuth><LogsPage /></RequireAuth>} />

          <Route path="/logs/:id/workouts" element={<RequireAuth><WorkoutsPage /></RequireAuth>} />

          <Route path="/logs/:id/meals" element={<RequireAuth><MealsPage /></RequireAuth>} />

          <Route path="/build" element={<RequireAuth><BuildPage /></RequireAuth>} />
          <Route path="/settings" element={<RequireAuth><AccountPage /></RequireAuth>} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
