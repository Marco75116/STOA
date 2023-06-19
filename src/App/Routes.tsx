import React from "react";
import { Routes as AppRoutes, Route } from "react-router-dom";
import AboutPage from "../pages/AboutPage/AboutPage";
import PointsPage from "../pages/PointsPage/PointsPage";
import SwapPage from "../pages/SwapPage/SwapPage";
import TemplatePage from "../pages/TemplatePage/TemplatePage";
import KYC from "../pages/KYC/KYC";
import Earnings from "../pages/EarningsPage/Earnings";

const Routes = () => {
  return (
    <AppRoutes>
      <Route path="/" element={<SwapPage />} />
      <Route path="/Swap" element={<SwapPage />} />
      <Route path="/Earnings" element={<Earnings />} />
      <Route path="/Points" element={<PointsPage />} />
      <Route path="/About" element={<AboutPage />} />
      <Route path="/test" element={<TemplatePage />} />
      <Route path="/KYC" element={<KYC />} />
    </AppRoutes>
  );
};

export default Routes;
