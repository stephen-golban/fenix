import React from "react";

import { Route, Routes } from "react-router-dom";
import { HomeModule, NotFoundModule } from "./modules";
import { RootLayout } from "./components/layout";

const App = () => {
  return (
    <RootLayout>
      <Routes>
        {/* if user is authenticated the go to chats page else login page */}
        <Route path="/" element={<HomeModule />} />

        <Route path="*" element={<NotFoundModule />} />
      </Routes>
    </RootLayout>
  );
};

export default App;
