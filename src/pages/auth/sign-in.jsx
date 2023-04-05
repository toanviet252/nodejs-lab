import { Form, Input, Button, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { signIn } from "../../apis/auth";
import { useContext, useState } from "react";
import { saveToken } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
// import LoadingFallback from "../../components/Suspsen/SuspsenFallback";

const SigninPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { loggedIn, setUserData } = useContext(AuthContext);
  const onFinish = async (value) => {
    setLoading(true);
    try {
      const res = await signIn(value);
      saveToken(res.data.token);
      setUserData(res.data.user);
      loggedIn();
      message.success("Logged");
      setLoading(false);
      navigate("/");
    } catch (err) {
      message.error(err?.response?.data?.message || err.message);
      console.log(err);
      setLoading(false);
    }
  };
  return (
    <div
      className="sign-in-wrapper"
      style={{
        minHeight: "85vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        style={{
          width: "25%",
        }}
        requiredMark={false}
      >
        <Form.Item label="Email" name="email" rules={[{ required: true }]}>
          <Input prefix={<FontAwesomeIcon icon={faEnvelope} />} />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true }]}>
          <Input.Password prefix={<FontAwesomeIcon icon={faLock} />} />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Login
        </Button>
      </Form>
    </div>
  );
};
export default SigninPage;
