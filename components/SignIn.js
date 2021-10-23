import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../lib/auth.js";
import { useFormik } from "formik";
import Button from "../ui/Button";

export default function SignIn({ onResetPass }) {
  const { signInWithEmailAndPass } = useAuth();
  const [message, setMessage] = useState("");
  const router = useRouter()

  const onSubmit = async (values) => {
    setMessage("Processing...");

    return new Promise(async (reject) => {
      try {
        await signInWithEmailAndPass(values).then((response) => {
          if (response.error) {
            setMessage(response.message);
          }
          else {
            router.push('/trivia')
          }
        });

      } catch (error) {
        console.error(error);

        setMessage(error.message);

        reject();
      }
    });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      pass: "",
    },
    onSubmit: onSubmit,
  });

  // const onRecoverPassword = () => {
  //   const email = formik.values.email;
  //   onResetPass(email);
  // };

  return (
    <form
      className="flex flex-col justify-items-center"
      onSubmit={formik.handleSubmit}
    >
      <input
        id="email"
        name="email"
        type="text"
        placeholder="Email"
        className="w-full text-left text-secondary border-2 mb-4 px-4 py-2 focus:outline-none focus:ring disabled:opacity-50 bg-white"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <input
        id="pass"
        name="pass"
        type="password"
        placeholder="Password"
        className="w-full text-left text-secondary border-2 mb-4 px-4 py-2 focus:outline-none focus:ring disabled:opacity-50 bg-white"
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      {message && (
        <p className="h-12 text-error text-sm text-center">{message}</p>
      )}
      {/* <button onClick={onRecoverPassword}>Olvidé mi contraseña</button> */}
      <Button type="submit">Sign In</Button>
    </form>
  );
}
