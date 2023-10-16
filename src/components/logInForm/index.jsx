import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useSignIn } from "react-auth-kit";
//import { users } from "../../assets/DB"; //temporary - DB
import { useUsersContext } from "../../contexts/UsersContext.jsx";

const schema = yup.object().shape({
  email: yup.string().required("אימייל חובה").email("פורמט האימייל שגוי"),
  password: yup
    .string()
    .required("סיסמה חובה")
    .min(4, " סיסמה חייבת להיות לפחות 4 תווים"),
});

const LogInForm = () => {
  const signIn = useSignIn();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { users } = useUsersContext();

  const onSubmit = (data) => {
    const dbUserData = users.find(
      (user) => user.email === data.email && user.password === data.password
    );
    signIn({
      expiresIn: null, // don`t really supposed to be null - just fot checking
      // given_name: userData.data.given_name,
      tokenType: "Bearer",
      token: null, // don`t really supposed to be null - just fot checking
      authState: {
        email: dbUserData.email,
        name: dbUserData.name,
        //imgPath: userData.data.picture,
        id: dbUserData.id,
        connectionType: "registered",
        role: dbUserData.role,
        permissions: dbUserData.permissions,
      },
    });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col
          xs={12}
          md={6}
          style={{
            backgroundColor: "#022855",
            padding: "3%",
            borderRadius: "10px",
            marginBottom: "",
            width: "70%",
            margin: "5% 0%",
          }}
        >
          <Form
            onSubmit={handleSubmit(onSubmit)}
            style={{ backgroundColor: "inherit" }}
          >
            <Form.Group
              controlId="email"
              style={{ backgroundColor: "inherit" }}
            >
              <Form.Label
                style={{ backgroundColor: "inherit", color: "white" }}
              >
                אימייל
              </Form.Label>
              <input
                {...register("email")}
                type="text"
                placeholder="Enter your email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
              />
              {errors.email && (
                <div
                  style={{ backgroundColor: "inherit" }}
                  className="invalid-feedback"
                >
                  {errors.email.message}
                </div>
              )}
            </Form.Group>

            <Form.Group
              controlId="password"
              style={{ backgroundColor: "inherit" }}
            >
              <Form.Label
                style={{ backgroundColor: "inherit", color: "white" }}
              >
                סיסמה
              </Form.Label>
              <input
                {...register("password")}
                type="password"
                placeholder="Enter your password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
              />
              {errors.password && (
                <div
                  className="invalid-feedback"
                  style={{ backgroundColor: "inherit" }}
                >
                  {errors.password.message}
                </div>
              )}
            </Form.Group>

            <Button
              type="submit"
              style={{
                marginTop: "6%",
                backgroundColor: "#00b3bf",
                border: "none",
              }}
            >
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LogInForm;
