import React from "react";

import { signin } from "../../store";
import useAxiosRequest from "../../api/hooks";
import { useLocation, useNavigate } from "react-router-dom";

import { Button, Form, Input, type FormProps } from "antd";

import type { LoginFieldType } from "../../typings/login";

const onFinishFailed: FormProps<LoginFieldType>["onFinishFailed"] = (
  errorInfo
) => {
  console.log("Failed:", errorInfo);
};

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [call, { loading }] = useAxiosRequest<{ access_token: string }>(
    "/auth/login",
    "post"
  );

  const from = location.state?.from?.pathname || "/";

  const onFinish: FormProps<LoginFieldType>["onFinish"] = async (values) => {
    return await call(
      { username: values.email, pass: values.password },
      ({ access_token }) => {
        return signin(access_token, () => navigate(from, { replace: true }));
      }
    );
  };

  return (
    <Form
      name="basic"
      autoComplete="off"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={{ remember: true }}
    >
      <Form.Item<LoginFieldType>
        name="email"
        rules={[
          { required: true, message: "Va rugam sa completati acest spatiu!" },
          {
            type: "email",
            message: "Email-ul introdus nu are o forma corecta",
          },
        ]}
      >
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item<LoginFieldType>
        name="password"
        rules={[
          { required: true, message: "Va rugam sa completati acest spatiu!" },
        ]}
      >
        <Input.Password placeholder="Parola" />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="submit-btn"
          loading={loading}
        >
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export { LoginScreen };
