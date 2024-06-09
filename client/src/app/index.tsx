import React from "react";
import { App as AntdApp } from "antd";
import { Route, Routes } from "react-router-dom";
import { HomeModule, NotFoundModule, CategoriesModule } from "./modules";
import Product from "./modules/product";
import { ScrollToTop } from "./components/reusable";
import { About } from "./modules/about";

const App = () => {
  return (
    <AntdApp>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomeModule />} />
        <Route path="/categories/:id" element={<CategoriesModule />} />
        <Route path="/categories" element={<CategoriesModule />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFoundModule />} />
      </Routes>
    </AntdApp>
  );
};

export default App;
