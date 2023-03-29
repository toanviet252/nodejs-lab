import { Button, Form, Input, message } from "antd";
import { signUp } from "../../apis/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const SignUpPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await signUp(values);
      console.log(res.data);
      if (res.status !== 200 && res.status !== 201)
        throw new Error(res.data?.message);
      message.success(res.data.message);
      setLoading(false);
      navigate("auth/signin");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        message.error(err.response.data.message);
      } else {
        message.error(err.message);
      }
      setLoading(false);
      console.log(err);
    }
  };
  return (
    <div
      className="sign-up-container"
      style={{
        width: "50%",
        margin: "2rem auto",
        padding: "1rem",
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
            },
            {
              type: "email",
              message: "Email is invalid",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Fullname"
          name="fullName"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value)
                  return Promise.resolve();
                return Promise.reject("Password is not match");
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form>
    </div>
  );
};
export default SignUpPage;
