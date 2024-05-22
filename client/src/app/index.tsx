import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomeModule, NotFoundModule, CategoriesModule } from "./modules";
import { RootLayout } from "./components/layout";
import Product from "./modules/product";
import { ScrollToTop } from "./components/reusable";
import { About } from "./modules/about";

const App = () => {
  return (
    <RootLayout>
      <ScrollToTop />
      <Routes>
        {/* if user is authenticated the go to chats page else login page */}
        <Route path="/" element={<HomeModule />} />
        <Route path="/categories/:id" element={<CategoriesModule />} />
        <Route path="/categories/" element={<CategoriesModule />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="*" element={<NotFoundModule />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </RootLayout>
  );
};

export default App;
