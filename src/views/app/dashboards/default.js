import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Link } from "react-router-dom";
import {connect} from "react-redux";
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

class DefaultDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date:this.props.date,
      batchData:"",
      waiting:true,
  
    };
  }


  getDate=(date)=> {
    this.setState({date:date})
    
  }

  getTime=(date) =>{
    var day;
switch (new Date(date).getDay()) {
  case 0:
    day = "su";
    break;
  case 1:
    day = "mo";
    break;
  case 2:
    day = "tu";
    break;
  case 3:
    day = "we";
    break;
  case 4:
    day = "th";
    break;
  case 5:
    day = "fr";
    break;
  case  6:
    day = "sa";
    break;
  default:
    day ="not a day";
}

var item
for(var i =0; i< this.state.batchData.length;i++){
  if(this.state.batchData[i].time.hasOwnProperty(day)){
    item = this.state.batchData[i].time[day];
    if(item.enable === true){
      var batchTimeHr=Math.floor(item.time/60);
      var batchTimeMi=item.time%60;
      let batchData = JSON.parse(JSON.stringify(this.state.batchData));
      batchData[i].time_hr=batchTimeHr;
      batchData[i].time_mi = ":"+ batchTimeMi.toString().slice(0,2);
      if(batchTimeHr>12){
        batchTimeHr=batchTimeHr-12;
        batchData[i].timing = `${batchTimeHr} : ${batchTimeMi} PM`
      }
      else if(batchTimeHr<12){
        batchData[i].timing = `${batchTimeHr} : ${batchTimeMi} AM`
      }
      else if(batchTimeHr===12){
        batchData[i].timing = `${batchTimeHr} : ${batchTimeMi} PM`
      }
      else if(batchTimeHr===24){
        batchData[i].timing = `00 : ${batchTimeMi} AM`
      }
      
      this.setState({
        batchData:batchData,
        waiting:false
      }) 
    }
    else{
      let batchData = JSON.parse(JSON.stringify(this.state.batchData));
      batchData[i].time_hr="Class Off";
      batchData[i].time_mi = "";
      batchData[i].timing = "Class Off";
      this.setState({
        batchData:batchData,
      }) 
    }
  }
}

  }

  getTimetableData=(date)=>{
    const packet = {
      date: (this.state.date).toISOString(),
    };
    const auth = localStorage.getItem("jwt");
    axios
    .post("/batches", packet, { headers: {"Authorization" : `${auth}`} })
    .then(response => {
      if (response.data.code !== 200) {
        console.log(response)
      } else if (
        response.data.code === 200 
      ) {
       this.setState({batchData: response.data.batches})
      //  console.log(this.state.batchData)
      //  console.log(this.props.date)
      //  console.log(new Date(packet.date).getDay());
       this.getTime(packet.date);
      } 
      console.log(response)
    })
    .catch(error => console.log(error)); 
};
  
shouldComponentUpdate(nextProps, nextState) {
  if (nextState.date !== this.state.date) {
    return true;
  }
  return false; 
} 

  componentDidMount = () =>{
    console.log("this is from comoponentDIdMount")
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
     src= {`https://api2.funedulearn.com/${station.picture}`}
     alt="Card image cap"
   />
   

   <CardBody>
<CardTitle>{station.subject}</CardTitle>
     <div className="flex_props">
<CardSubtitle>{station.teacher_id.name}</CardSubtitle>
<span className="card_time">{station.timing}</span>
     </div>
     <div className="flex_props">
       <Link style={{ fontSize: "18px" }} to="/app/attendance">
         Take Attendance 
       </Link>
       <Link style={{ fontSize: "18px" }} to="/app/announcements">
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
            <DateSlider dateHandler={this.getDate} ></DateSlider>
          </Colxx>
        </Row>
        <Row>
        {rainbow}
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
      date:state.BatchData.date
  };
};


const mapDispatchToProps = dispatch => {
  return {
      onDateChange:(date) => dispatch({type:"GET_TIME", payload:date})
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(DefaultDashboard) ;
