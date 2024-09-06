import { useState } from "react";
import * as Yup from "yup";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { checkToken, login } from "../core/_requests";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import { useAuth } from "../core/Auth";
import FormGenerator from "../../form-generator/modules/form-generator/FormGenerator";

const loginSchema = Yup.object().shape({
  phoneNumber: Yup.string().required("شماره همراه الزامیست"),
  password:
    Yup.string()
    .required("رمزعبور الزامیست"),
});

export function Login() {
  const [loading, setLoading] = useState(false);
  const { saveAuth, setCurrentUser } = useAuth();

  // const formik = useFormik({
  //   initialValues,
  //   validationSchema: loginSchema,
  //   onSubmit: async (values, { setStatus, setSubmitting }) => {
  //     setLoading(true);
  //     try {
  //       const { data: auth } = await login(values.email, values.password);
  //       saveAuth(auth);
  //       const { data: user } = await getUserByToken(auth.api_token);
  //       setCurrentUser(user);
  //     } catch (error) {
  //       console.error(error);
  //       saveAuth(undefined);
  //       setStatus("The login details are incorrect");
  //       setSubmitting(false);
  //       setLoading(false);
  //     }
  //   },
  // });

  return (
    <FormGenerator
      errMessageType="Field"
      fields={[
        {
          type: "TextField",
          direction: "ltr",
          className: "col-12",
          label: "شماره همراه",
          name: "phoneNumber",
          allowClear: true,
        },
        {
          type: "TextField",
          textType: "password",
          className: "col-12",

          name: "password",
          direction: "ltr",
          label: "رمز عبورd",
        },
      ]}
      initState={{}}
      validation={loginSchema}
      handleSubmit={{
        className: "col-12 p-1",
        handler: async (props) => {
          try {
            const data = await login(
              props.values.phoneNumber,
              props.values.password
            );
            saveAuth(data.data);
            const user = await checkToken(data.data.token);
            setCurrentUser(user.data);
          } catch (error) {
            console.error(error);
            saveAuth(undefined);

            setLoading(false);
          }
        },
        text: "ورود",
      }}
    />
  );
}
