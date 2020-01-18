import React, { Component } from "react";
import { Row, Card, CardTitle, Form, Label, Input, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import axios from '../../../src/axios-dashboard';
import firebase from 'firebase';
import * as firebaseApp from '../../helpers/Firebase';
import { registerUser } from "../../redux/actions";
import RadioButton from "../../components/RadioButton/RadioButton";
import IntlMessages from "../../helpers/IntlMessages";
import { Colxx } from "../../components/common/CustomBootstrap";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone:"",
      type:"",
      otp:"",
      name:"",
      ic:"",
      uid:"",
      method:"",
      otpSent:false,
      isNewUser:false,
      verificationID:false
    };
  }
  onUserRegister =(event) => {
   const packet ={
    "phone_number": this.state.phone,
    "type": this.state.type,
    "method":"check",
    "institute_code":this.state.ic
    }
    axios.post('/auth/login', packet).then( response => {
      if(response.data.new_user===true){
        this.setState({isNewUser:true, otpSent:true, method:"signup"})
      }
      else if(response.data.new_user===false){
        this.setState({otpSent:true, method:"login"})
      }
    }).catch(error => console.log(error));
  }

  onAuthSuccessful = (event) => {
   const packet = {
    "phone_number": this.state.phone,
    "type": this.state.type,
    "method":this.state.method,
    "institute_code":this.state.ic,
    "firebase_uid":this.state.uid,
    "name":this.state.name
   }
   axios.post('/auth/login', packet).then( response => {
    this.props.history.push('/');
    
  }).catch(error => console.log(error));
  }

  radioChangeHandler = (event) => {

    this.setState({
        type: event.target.value
    });

  }

  componentDidMount(){
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': function(response) {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
         //submitPhoneNumberAuth();
      }
    });
  }

  submitPhoneNumberAuth =(event) =>{
    var phoneNumber = this.state.phone;
    var appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber("+91"+phoneNumber, appVerifier)
      .then(confirmationResult => {
        window.confirmationResult = confirmationResult;
        if(confirmationResult.verificationId){
          this.setState({verificationID:true})
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  submitPhoneNumberAuthCode =(event) => {
    var code = this.state.otp;
   window.confirmationResult.confirm(code)
      .then(result => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(idToken => {
          // Send token to your backend via HTTPS
          // ...
        this.setState({uid:idToken})
        this.onAuthSuccessful();
        }).catch(function(error) {
          console.log(error)
        });
        // var user = result.user;
        // 
        
      })
      .catch(function(error) {
        console.log(error);
      });

  }

  render() {
    var otpBlock ="";
    if(this.state.otpSent === true){
      otpBlock =  <Label className="form-group has-float-label mb-4">
      <Input type="text" required onChange={e => this.setState({ otp: e.target.value })} />
      <span>OTP</span>
    </Label>
    }

    var nameBlock ="";
    if(this.state.isNewUser === true){
      nameBlock = <Label className="form-group has-float-label mb-4">
      <Input type="text"  onChange={e => this.setState({ name: e.target.value })} />
      <span>Name</span>
    </Label>
    }
    var btn = <Button color="primary" className="btn-shadow" size="lg" onClick={this.onUserRegister}><span>Verify</span></Button> 
      if(this.state.otpSent===true){
     
        btn = <div>
                  <Button color="link" size="sm" style={{margin:" 10px auto"}} onClick={this.submitPhoneNumberAuth}><span>Send OTP</span></Button> 
                  <Button color="primary" className="btn-shadow" size="lg" onClick={this.submitPhoneNumberAuthCode}><span>Login</span></Button> 
              </div>
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
              <div className ="account_type">
                <div className="radio-btn-container" style={{ display: "flex" }}>

                  <RadioButton 
                      changed={ this.radioChangeHandler } 
                      id="1"
                      label="Teacher" 
                      value="t" 
                      name="accountType"
                  />

                  <RadioButton 
                      changed={ this.radioChangeHandler } 
                      id="2" 
                      label="Student" 
                      value="s" 
                      name="accountType"
                  />
                  <RadioButton 
                      changed={ this.radioChangeHandler } 
                      id="3" 
                      label="Parent" 
                      value="p" 
                      name="accountType"
                  />

                </div>
                </div>
                <div id="recaptcha-container"></div>
              <Form>
                <Label className="form-group has-float-label mb-4">
                  <Input type="tel" required onChange={e => this.setState({ phone: e.target.value })} />
                  <span>Phone Number</span>
                </Label>
                <Label className="form-group has-float-label mb-4">
                  <Input type="text" required onChange={e => this.setState({ ic: e.target.value })} />
                  <span>Institute Code</span>
                </Label>
                {nameBlock}
                {otpBlock}
               
                <div className="d-flex justify-content-end align-items-center">
               {btn}
                 
                </div>
              </Form>
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

export default connect(
  mapStateToProps,
  {
    registerUser
  }
)(Register);
