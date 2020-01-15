import React, { Component } from "react";
import { connect } from "react-redux";
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import { registerUser } from "../../redux/actions";






class Register extends Component {  

  componentDidMount(){
    
const firebaseConfig = {
  apiKey: "AIzaSyBKS2Gop0fFO66TPC0Z5OHMwJTBXsiJ7zg",
  authDomain: "coachingtech-9f8ba.firebaseapp.com",
  databaseURL: "https://coachingtech-9f8ba.firebaseio.com",
  projectId: "coachingtech-9f8ba",
  storageBucket: "coachingtech-9f8ba.appspot.com",
  messagingSenderId: "18501623957",
  appId: "1:18501623957:web:376da22a8a23eed4d2bb9c",
  measurementId: "G-42M9VL9FKZ"
};

firebase.initializeApp(firebaseConfig);

var uiConfig = {
  signInSuccessUrl: '/',
  signInOptions: [
      {
        provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        recaptchaParameters: {
          size: 'invisible', // 'invisible' or 'compact'
        },
        defaultCountry: 'IN', // Set default country to the United Kingdom (+44).
        // For prefilling the national number, set defaultNationNumber.
        // This will only be observed if only phone Auth provider is used since
        // for multiple providers, the NASCAR screen will always render first
        // with a 'sign in with phone number' button.
      
      }
    ]
};

var ui  = new firebaseui.auth.AuthUI(firebase.auth())

ui.start('#firebaseui-auth-container',uiConfig);

  }

  render() {

    return (
      <div className ="register">
      <h1>Welcome to My Awesome App</h1>
      <div id="firebaseui-auth-container"></div>
  </div>
          
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
