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
import { Button as btn, Comment, Form, Header } from 'semantic-ui-react'
import Switch from "react-switch";

import DateSlider from '../../../components/DateSlider';
import './default.css';

class Announcement extends Component {
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
         <Button style={{ fontSize:"18px", textDecoration:"none"}} color="link" onClick={this.toggleRight} >Make Announcement</Button>
         </div>
         <Modal
                    isOpen={this.state.modalRight}
                    toggle={this.toggleRight}
                    wrapClassName="modal-right">
                    <ModalHeader toggle={this.toggleRight}>
                      Announcement
                    </ModalHeader>
                    <ModalBody>
                    <Comment.Group>
    <Header as='h3' dividing>
      Comments
    </Header>

    <Comment>
      <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
      <Comment.Content>
        <Comment.Author as='a'>Matt</Comment.Author>
        <Comment.Metadata>
          <div>Today at 5:42PM</div>
        </Comment.Metadata>
        <Comment.Text>How artistic!</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>

    <Comment>
      <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
      <Comment.Content>
        <Comment.Author as='a'>Elliot Fu</Comment.Author>
        <Comment.Metadata>
          <div>Yesterday at 12:30AM</div>
        </Comment.Metadata>
        <Comment.Text>
          <p>This has been very useful for my research. Thanks as well!</p>
        </Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
      <Comment.Group>
        <Comment>
          <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
          <Comment.Content>
            <Comment.Author as='a'>Jenny Hess</Comment.Author>
            <Comment.Metadata>
              <div>Just now</div>
            </Comment.Metadata>
            <Comment.Text>Elliot you are always so right :)</Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      </Comment.Group>
    </Comment>

    <Comment>
      <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
      <Comment.Content>
        <Comment.Author as='a'>Joe Henderson</Comment.Author>
        <Comment.Metadata>
          <div>5 days ago</div>
        </Comment.Metadata>
        <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>

    <Form reply>
      <Form.TextArea />
      <btn content='Add Reply' labelPosition='left' icon='edit' primary />
    </Form>
  </Comment.Group>
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
          <Button style={{ fontSize:"18px", textDecoration:"none"}} color="link" onClick={this.toggleRight} >Make Announcement</Button>
          
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
          <Button style={{ fontSize:"18px", textDecoration:"none"}} color="link" onClick={this.toggleRight} >Make Announcement</Button>
          
        </CardBody>
      </Card>
          </Colxx>
        </Row>
     
          
      </Fragment>
    );
  }
}
export default injectIntl(Announcement);
