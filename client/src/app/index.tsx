import React from "react";

import { Route, Routes } from "react-router-dom";
import { HomeModule, NotFoundModule, CategoriesModule } from "./modules";
import { RootLayout } from "./components/layout";
import Product from "./modules/product";

const App = () => {
  return (
    <RootLayout>
      <Routes>
        {/* if user is authenticated the go to chats page else login page */}
        <Route path="/" element={<HomeModule />} />
        <Route
          path="/categories/all-colection"
          element={<CategoriesModule />}
        />
        <Route path="/product/prod-1" element={<Product />} />
        <Route path="*" element={<NotFoundModule />} />
      </Routes>
    </RootLayout>
  );
};

export default App;
