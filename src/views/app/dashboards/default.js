import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Link } from "react-router-dom";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardLink,
  CardTitle,
  CardSubtitle,
  Button,
  NavLink
} from "reactstrap";
import axios from "../../../axios-dashboard";
import DateSlider from "../../../components/DateSlider";
import "./default.css";
import Axios from "axios";

class DefaultDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      batchData:"",
      waiting:true
  
    };
  }

  getDate=(date)=>{
    this.setState({date:date})
  }

  

  getTimetableData=()=>{
    const packet = {
      date: (this.state.date).toISOString(),
    };
    const auth = localStorage.getItem("jwt");
    axios
    .post("/batches", packet, { headers: {"Authorization" : `${auth}`} })
    .then(response => {
      if (response.data.code !== 200) {
        //todo: wrong inst code pp[up]
        console.log(response)
      } else if (
        response.data.code === 200 
      ) {
       this.setState({batchData: response.data.batches, waiting:false})
       console.log(this.state.batchData)
      } 
      console.log(response)
    })
    .catch(error => console.log(error)); //todo: add check internet conn popup
};
  
shouldComponentUpdate(nextProps, nextState) {
  if (nextState.date !== this.state.date) {
    return true;
  }
  return false; //this is the missing piece
} 

  componentDidMount = () =>{
    console.log("this is from comoponentDIdMount")
    console.log((this.state.date).toISOString())
    this.getTimetableData();
   
    
  }
  componentDidUpdate=()=>{
    console.log("this is from comoponentDIdUpdate");
    
    this.getTimetableData();
   
  }
  render() {
    
if(this.state.waiting===false){
 var rainbow =  this.state.batchData.map(station =>   <Colxx sm="12" lg="4" key={station._id} className="mb-4">
 <Card>
   <CardImg
     top
     width="100%"
     src="/assets/img/chocolate-cake-thumb.jpg"
     alt="Card image cap"
   />
   

   <CardBody>
<CardTitle>{station.name}</CardTitle>
     <div className="flex_props">
       <CardSubtitle>Ms Shobhita Dhulipala</CardSubtitle>
       <span className="card_time">4:30 PM</span>
     </div>
     <div className="flex_props">
       <Link style={{ fontSize: "18px" }} to="/app/attendance">
         Take Attendance 
       </Link>
       <Link style={{ fontSize: "18px" }} to="#">
         Make Announcements
       </Link>
     </div>
   </CardBody>
 </Card>
</Colxx> ) 

}

    return (
      <Fragment>
        <Row>
          <Colxx xxs="12" className="mb-5">
            <DateSlider dateHandler={this.getDate}></DateSlider>
          </Colxx>
        </Row>
        <Row>
        {rainbow}
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(DefaultDashboard);
