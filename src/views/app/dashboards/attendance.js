import React, { Component, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { Row } from 'reactstrap';
import {Link} from 'react-router-dom';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import {
  Card, CardImg, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, Button, NavLink, Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import Switch from "react-switch";

import DateSlider from '../../../components/DateSlider';
import './default.css';

class Attendance extends Component {
  constructor() {
    super();
    this.state = { 
      checked: false,
      modalRight: false };
    this.handleChange = this.handleChange.bind(this);
  }



  toggleRight = () => {
    this.setState(prevState => ({
      modalRight: !prevState.modalRight
    }));
  };

  handleChange(checked) {
    this.setState({ checked });
  }

  render() {
    const { messages } = this.props.intl;
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="menu.default" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
    
        <Row>
      
          <Colxx xxs="12" className="mb-5">
           <DateSlider></DateSlider>
          </Colxx>
        </Row>
        <Row>
          <Colxx sm="12" lg="4" className="mb-4">
          <Card>
        <CardImg top width="100%" src="/assets/img/chocolate-cake-thumb.jpg" alt="Card image cap" />
        <CardBody>
          <CardTitle>Chemistry</CardTitle>
          <div className="flex_props">
          <CardSubtitle>Ms Shobhita Dhulipala</CardSubtitle><span className="card_time">4:30 PM</span>
          </div>
         <div className="flex_props">
         <Button style={{ fontSize:"18px", textDecoration:"none"}} color="link" onClick={this.toggleRight} >Take Attendance</Button>
         </div>
         <Modal
                    isOpen={this.state.modalRight}
                    toggle={this.toggleRight}
                    wrapClassName="modal-right">
                    <ModalHeader toggle={this.toggleRight}>
                      Attendance
                    </ModalHeader>
                    <ModalBody>
                    <ul>
                      <li name="item1">student 1  <Switch onChange={this.handleChange} checked={this.state.checked} /></li>
                      <li name="item2">student 2  <Switch onChange={this.handleChange} checked={this.state.checked} /></li>
                      <li name="item3">student 3  <Switch onChange={this.handleChange} checked={this.state.checked} /></li>
                      <li name="item4">student 4  <Switch onChange={this.handleChange} checked={this.state.checked} /></li>
                      <li name="item5">student 5  <Switch onChange={this.handleChange} checked={this.state.checked} /></li>
                      <li name="item6">student 6  <Switch onChange={this.handleChange} checked={this.state.checked} /></li>
                      <li name="item7">student 7  <Switch onChange={this.handleChange} checked={this.state.checked} /></li>
                      <li name="item8">student 8  <Switch onChange={this.handleChange} checked={this.state.checked} /></li>
                      <li name="item9">student 9  <Switch onChange={this.handleChange} checked={this.state.checked} /></li>
                      <li name="item10">student 10 <Switch onChange={this.handleChange} checked={this.state.checked} /></li>
                    </ul>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={this.toggleRight}>
                      <i className="iconsminds-save"> Save</i> 
                      </Button>{" "}
                      <Button color="secondary" onClick={this.toggleRight}>
                        Cancel
                      </Button>
                    </ModalFooter>
                  </Modal>
          
        </CardBody>
      </Card>
          </Colxx>
          <Colxx md="6" lg="4" className="mb-4">
          <Card>
        <CardImg top width="100%" src="/assets/img/chocolate-cake-thumb.jpg" alt="Card image cap" />
        <CardBody>
          <CardTitle>Chemistry</CardTitle>
          <div className="flex_props">
          <CardSubtitle>Ms Shobhita Dhulipala</CardSubtitle><span className="card_time">4:30 PM</span>
          </div>
          <Button style={{ fontSize:"18px", textDecoration:"none"}} color="link" onClick={this.toggleRight} >Take Attendance</Button>
          
        </CardBody>
      </Card>
          </Colxx>
          <Colxx md="6" lg="4" className="mb-4">
          <Card>
        <CardImg top width="100%" src="/assets/img/chocolate-cake-thumb.jpg" alt="Card image cap" />
        <CardBody>
          <CardTitle>Chemistry</CardTitle>
          <div className="flex_props">
          <CardSubtitle>Ms Shobhita Dhulipala</CardSubtitle><span className="card_time">4:30 PM</span>
          </div>
          <Button style={{ fontSize:"18px", textDecoration:"none"}} color="link" onClick={this.toggleRight} >Take Attendance</Button>
          
        </CardBody>
      </Card>
          </Colxx>
        </Row>
     
          
      </Fragment>
    );
  }
}
export default injectIntl(Attendance);
