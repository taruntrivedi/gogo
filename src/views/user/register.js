import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import axios from "../../../src/axios-dashboard";
import firebase from "firebase";
import { registerUser } from "../../redux/actions";
import IntlMessages from "../../helpers/IntlMessages";
import { Colxx } from "../../components/common/CustomBootstrap";
import "./register.css";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FormikCustomRadioGroup } from "../../containers/form-validations/FormikFields";
import {
  Row,
  Card,
  FormGroup,
  Label,
  Button,
  CardTitle
} from "reactstrap";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      type: "",
      otp: "",
      name: "",
      ic: "",
      uid: "",
      method: "",
      otpSent: false,
      isNewUser: false,
      verificationID: false
    };
  }

  handleSubmit = (values, { setSubmitting }) => {
    this.setState({
      phone: values.mobile,
      type: values.customRadioGroup,
      ic: values.ic,
      name: values.name,
      otp: values.otp
    });
    setTimeout(() => {
      if (this.state.otpSent === false) {
        this.onUserRegister();
      } else {
        this.submitPhoneNumberAuthCode();
      }
      setSubmitting(false);
    }, 1000);
  };

  onUserRegister = event => {
    const packet = {
      phone_number: this.state.phone,
      type: this.state.type,
      method: "check",
      institute_code: this.state.ic
    };
    axios
      .post("/auth/login", packet)
      .then(response => {
        if (response.data.code === 480) {
          //todo: wrong inst code pp[up]
        } else if (
          response.data.code === 200 &&
          response.data.new_user === true
        ) {
          this.setState({ isNewUser: true, otpSent: true, method: "signup" });
          this.submitPhoneNumberAuth();
        } else if (
          response.data.code === 200 &&
          response.data.new_user === false
        ) {
          this.setState({ otpSent: true, method: "login" });
          this.submitPhoneNumberAuth();
        }
      })
      .catch(error => console.log(error)); //todo: add check internet conn popup
  };

  onAuthSuccessful = event => {
    const packet = {
      phone_number: this.state.phone,
      type: this.state.type,
      method: this.state.method,
      institute_code: this.state.ic,
      firebase_uid: this.state.uid,
      name: this.state.name
    };
    axios
      .post("/auth/login", packet)
      .then(response => {
        if (response.data.code === 200) {
          localStorage.setItem("jwt", response.data.data.jwttoken);
          this.props.history.push("/");
        } else {
          console.log(response);
        }
      })
      .catch(error => console.log(error));
  };

  radioChangeHandler = event => {
    this.setState({
      type: event.target.value
    });
  };

  componentDidMount() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: function(response) {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          //submitPhoneNumberAuth();
        }
      }
    );
  }

  submitPhoneNumberAuth = event => {
    var phoneNumber = this.state.phone;
    var appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber("+91" + phoneNumber, appVerifier)
      .then(confirmationResult => {
        window.confirmationResult = confirmationResult;
        if (confirmationResult.verificationId) {
          this.setState({ verificationID: true });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  submitPhoneNumberAuthCode = event => {
    var code = this.state.otp;
    window.confirmationResult
      .confirm(code)
      .then(result => {
        firebase
          .auth()
          .currentUser.getIdToken(/* forceRefresh */ true)
          .then(idToken => {
            // Send token to your backend via HTTPS
            // ...
            this.setState({ uid: idToken });
            this.onAuthSuccessful();
          })
          .catch(function(error) {
            console.log(error);
          });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    var SignupSchema;
    if (this.state.isNewUser === false && this.state.otpSent === false) {
      SignupSchema = Yup.object().shape({
        mobile: Yup.string()
          .matches(/^[6-9]\d{9}$/, {
            message: "Please enter valid number.",
            excludeEmptyString: false
          })
          .required("Phone number is required"),
        ic: Yup.string().required("A institute code is required"),
        customRadioGroup: Yup.string().required("A radio option is required")
      });
    } else if (this.state.isNewUser === true && this.state.otpSent === true) {
      SignupSchema = Yup.object().shape({
        mobile: Yup.string()
          .matches(/^[6-9]\d{9}$/, {
            message: "Please enter valid number.",
            excludeEmptyString: false
          })
          .required("Phone number is required"),
        name: Yup.string()
          .matches(/^[a-zA-Z ]+$/, {
            message: "Please enter valid name.",
            excludeEmptyString: false
          })
          .required("name is required"),
        otp: Yup.string()
          .matches(/^[0-9]{6}$/, {
            message: "Please enter valid OTP.",
            excludeEmptyString: false
          })
          .required("OTP is required"),
        ic: Yup.string().required("A institute code is required"),
        customRadioGroup: Yup.string().required("A radio option is required")
      });
    } else if (this.state.isNewUser === false && this.state.otpSent === true) {
      SignupSchema = Yup.object().shape({
        mobile: Yup.string()
          .matches(/^[6-9]\d{9}$/, {
            message: "Please enter valid number.",
            excludeEmptyString: false
          })
          .required("Phone number is required"),
        otp: Yup.string()
          .matches(/^[0-9]{6}$/, {
            message: "Please enter valid OTP.",
            excludeEmptyString: false
          })
          .required("OTP is required"),
        ic: Yup.string().required("A institute code is required"),
        customRadioGroup: Yup.string().required("A radio option is required")
      });
    }

    const options = [
      { value: "t", label: "Teacher" },
      { value: "s", label: "Student" },
      { value: "p", label: "Parent" }
    ];

    var btn = (
      <Button color="primary" type="submit" size="lg">
        Verify
      </Button>
    );
    if (this.state.otpSent === true) {
      btn = (
        <div>
          <Button
            color="link"
            size="sm"
            style={{ margin: " 10px auto" }}
            onClick={this.submitPhoneNumberAuth}
          >
            <span>Resend OTP</span>
          </Button>
          <Button color="primary" type="submit" size="lg">
            Login
          </Button>
        </div>
      );
    }

    return (
      <Row className="h-100">
        <Colxx xxs="12" md="10" className="mx-auto my-auto">
          <Card className="auth-card">
            <div className="position-relative image-side ">
              <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
              <p className="white mb-0">
                Please use this form to register. <br />
                If you are a member, please{" "}
                <NavLink to={`/user/login`} className="white">
                  login
                </NavLink>
                .
              </p>
            </div>
            <div className="form-side">
              <NavLink to={`/`} className="white">
                <span className="logo-single" />
              </NavLink>
              <CardTitle className="mb-4">
                <IntlMessages id="user.register" />
              </CardTitle>

              <Formik
                initialValues={{
                  mobile: "",
                  ic: "",
                  name: "",
                  otp: "",
                  customRadioGroup: ""
                }}
                validationSchema={SignupSchema}
                onSubmit={this.handleSubmit}
              >
                {({
                  handleSubmit,
                  setFieldValue,
                  setFieldTouched,
                  handleChange,
                  handleBlur,
                  values,
                  errors,
                  touched,
                  isSubmitting
                }) => (
                  <Form className="av-tooltip tooltip-label-right">
                    <div id="recaptcha-container"></div>
                    <FormGroup className="error-l-175">
                      <Label className="d-block">Profile</Label>
                      <FormikCustomRadioGroup
                        inline
                        name="customRadioGroup"
                        id="customRadioGroup"
                        label="Which of these?"
                        value={values.customRadioGroup}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        options={options}
                      />
                      {errors.customRadioGroup && touched.customRadioGroup ? (
                        <div className="invalid-feedback d-block">
                          {errors.customRadioGroup}
                        </div>
                      ) : null}
                    </FormGroup>
                    <FormGroup className="error-l-100">
                      <Label>
                        <span>Phone Number</span>
                      </Label>
                      <Field className="form-control" name="mobile" />
                      {errors.mobile && touched.mobile ? (
                        <div className="invalid-feedback d-block">
                          {errors.mobile}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup className="error-l-100">
                      <Label>
                        <span>Institute Code</span>
                      </Label>
                      <Field className="form-control" name="ic" />
                      {errors.ic && touched.ic ? (
                        <div className="invalid-feedback d-block">
                          {errors.ic}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup
                      className="error-l-100"
                      style={{
                        display: this.state.isNewUser ? "block" : "none"
                      }}
                    >
                      <Label>
                        <span>Name</span>
                      </Label>
                      <Field className="form-control" name="name" />
                      {errors.name && touched.name ? (
                        <div className="invalid-feedback d-block">
                          {errors.name}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup
                      className="error-l-100"
                      style={{ display: this.state.otpSent ? "block" : "none" }}
                    >
                      <Label>
                        <span>OTP</span>
                      </Label>
                      <Field className="form-control" name="otp" />
                      {errors.otp && touched.otp ? (
                        <div className="invalid-feedback d-block">
                          {errors.otp}
                        </div>
                      ) : null}
                    </FormGroup>

                    <div className="d-flex justify-content-end align-items-center">
                      {btn}
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </Card>
        </Colxx>
      </Row>
    );
  }
}
const mapStateToProps = ({ authUser }) => {
  const { user, loading } = authUser;
  return { user, loading };
};

export default connect(mapStateToProps, {
  registerUser
})(Register);
