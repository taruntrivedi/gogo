import React, { Component } from "react";
import moment from "moment";
import { Button } from "reactstrap";
import DatePicker from "react-datepicker";
import './DateSlider.css';
import "react-datepicker/dist/react-datepicker.css";

class DateSlider extends Component {
  state = {
    label: new Date()
  };

  componentDidMount() {
    // this.props.dateHandler(this.state.label);

  }
  componentDidUpdate=()=>{
    // this.props.dateHandler(this.state.label);
    
  }

  handleChange = date => {
    this.setState({
      label: date
    },function(){
      this.props.dateHandler(this.state.label);
    });
   

  };

  goToCurrent = () => {
    this.setState({ label: new Date() },function(){
      this.props.dateHandler(this.state.label);
    });
    

  };

  goToBack = () => {
    this.setState({
      label: new Date(new Date().setDate(new Date().getDate() - 1))
    },function(){
      this.props.dateHandler(this.state.label);
    });
 

  };

  goToNext = () => {
    this.setState({
      label: new Date(new Date().setDate(new Date().getDate() + 1))
    },function(){
      this.props.dateHandler(this.state.label);
    });
    

  };
  render() {
    return (
      <div className="slider_container">
          <div className="date_picker">
          <DatePicker 
          selected={moment(this.state.label)}
          onChange={this.handleChange}
          dateFormat="DD MMMM YYYY"
        />
          </div>
     <div>
     <Button color="link" onClick={this.goToBack}>
          <span className="simple-icon-arrow-left" /> Yesterday
        </Button>
        <Button color="primary" onClick={this.goToCurrent}>
          Today
        </Button>
        <Button color="link" onClick={this.goToNext}>
          Tomorrow <span className="simple-icon-arrow-right" />
        </Button>
     </div>
        
      </div>
    );
  }
}

export default DateSlider;
