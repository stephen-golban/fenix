import React from "react";

import { capitalize } from "lodash";
import { signout } from "../../store";
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";

import { Breadcrumb, Layout, Menu, Tooltip, theme } from "antd";
import {
  BarsOutlined,
  LogoutOutlined,
  ProfileOutlined,
} from "@ant-design/icons";

import type { MenuProps } from "antd";

import "./index.css";

const { Header, Content, Sider } = Layout;

const SIDEBAR_MENU_ITEMS = (navigate: NavigateFunction): MenuProps["items"] => [
  {
    key: "1",
    icon: <BarsOutlined />,
    label: "Categorii",
    onClick: () => navigate("categories"),
  },
  {
    key: "2",
    icon: <ProfileOutlined />,
    label: "Produse",
    onClick: () => navigate("products"),
  },
];

const LoggedInLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const breadcrumbs = pathname
    .substring(1)
    .split("/")
    .map((title) => ({ title: capitalize(title) }));

  return (
    <Layout>
      <Header className="header">
        <div className="demo-logo">
          Fenix Admin
          <Tooltip title="Delogare" placement="bottomLeft">
            <LogoutOutlined className="logout-btn" onClick={signout} />
          </Tooltip>
        </div>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            items={SIDEBAR_MENU_ITEMS(navigate)}
            style={{ height: "100%", borderRight: 0 }}
            defaultSelectedKeys={
              pathname.includes("categories") ? ["1"] : ["2"]
            }
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }} items={breadcrumbs} />
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export { LoggedInLayout };
