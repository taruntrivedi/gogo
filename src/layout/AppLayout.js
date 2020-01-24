import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter} from "react-router-dom";

import TopNav from "../containers/navs/Topnav";
import Sidebar from "../containers/navs/Sidebar";
import axios from "../axios-dashboard";
class AppLayout extends Component {

  getUserProfile=()=>{
    const packet = localStorage.getItem("jwt");
    axios.get("/user/profile", { headers: {"Authorization" : `${packet}`} }).then(response => {
        if (response.data.code === 200) {
          localStorage.setItem("name",response.data.user.name);
          localStorage.setItem("image",response.data.user.profileimage);
          localStorage.setItem("user_id",response.data.user._id);
        } else {
          console.log(response);
        }
      })
      .catch(error => console.log(error));
  }
  componentDidMount=()=>{
    this.getUserProfile();

  }
  render() {
    const { containerClassnames } = this.props;
    return (
      <div id="app-container" className={containerClassnames}>
        <TopNav history={this.props.history} />
        <Sidebar />
        <main>
          <div className="container-fluid">
          {this.props.children}
          </div>
        </main>
      </div>
    );
  }
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};
const mapActionToProps={}

export default withRouter(connect(
  mapStateToProps,
  mapActionToProps
)(AppLayout));
