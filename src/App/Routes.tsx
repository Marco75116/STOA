import React from "react";
import { Routes as AppRoutes, Route } from "react-router-dom";
import AboutPage from "../pages/AboutPage/AboutPage";
import PointsPage from "../pages/PointsPage/PointsPage";
import SwapPage from "../pages/SwapPage/SwapPage";
import VaultsPage from "../pages/VaultsPage/VaultsPage";
import TemplatePage from "../pages/TemplatePage/TemplatePage";

const Routes = () => {
  return (
    <AppRoutes>
      <Route path="/" element={<SwapPage />} />
      <Route path="/Swap" element={<SwapPage />} />
      <Route path="/Vaults" element={<VaultsPage />} />
      <Route path="/Points" element={<PointsPage />} />
      <Route path="/About" element={<AboutPage />} />
      <Route path="/test" element={<TemplatePage />} />
    </AppRoutes>
  );
};

export default Routes;
