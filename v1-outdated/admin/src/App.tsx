import router from "./router";
import { App as AntdApp } from "antd";
import { RouterProvider } from "react-router-dom";

const App = () => {
  return (
    <AntdApp>
      <RouterProvider router={router} />
    </AntdApp>
  );
};

export default App;
