import React, { Component, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { Row } from 'reactstrap';
import {Link} from 'react-router-dom';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import {
  Card, CardImg, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, Button, NavLink
} from 'reactstrap';


import DateSlider from '../../../components/DateSlider';
import './default.css';

class DefaultDashboard extends Component {
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
         <Link style={{ fontSize:"18px"}}  to="/app/attendance" >Take Attendance</Link>
         <Link style={{ fontSize:"18px"}}  to="#" >Make Announcements</Link>
         </div>
          
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
         <div className="flex_props">
         <Link style={{ fontSize:"18px"}}  to="#" >Take Attendance</Link>
         <Link style={{ fontSize:"18px"}}  to="#" >Make Announcements</Link>
         </div>
          
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
         <div className="flex_props">
         <Link style={{ fontSize:"18px"}}  to="#" >Take Attendance</Link>
         <Link style={{ fontSize:"18px"}}  to="#" >Make Announcements</Link>
         </div>
          
        </CardBody>
      </Card>
          </Colxx>
        </Row>
     
          
      </Fragment>
    );
  }
}
export default injectIntl(DefaultDashboard);
