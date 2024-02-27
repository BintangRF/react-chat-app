import { useState } from "react";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="-space-y-px">
        <Input
          labelText="Email address"
          labelFor="email-address"
          id="email-address"
          name="email"
          type="email"
          isRequired={true}
          placeholder="Email address"
        />
        <Input
          labelText="Password"
          labelFor="password"
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          isRequired={true}
          placeholder="Password"
        />
      </div>

      <FormExtra />
      <FormAction handleSubmit={handleSubmit} text="Login" />
      {err && alert("Try again")}
    </form>
  );
}
