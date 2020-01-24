import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Link } from "react-router-dom";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardLink,
  CardTitle,
  CardSubtitle,
  Button,
  NavLink,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input
} from "reactstrap";
import ThumbnailImage from "../../../components/cards/ThumbnailImage";
import DateSlider from "../../../components/DateSlider";
import "./default.css";

class StudyMaterial extends Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      modalRight: false,
      modal:false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

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
              <CardImg
                top
                width="100%"
                src="/assets/img/chocolate-cake-thumb.jpg"
                alt="Card image cap"
              />
              <CardBody>
                <CardTitle>Chemistry</CardTitle>
                <div className="flex_props">
                  <CardSubtitle>Ms Shobhita Dhulipala</CardSubtitle>
                  <span className="card_time">4:30 PM</span>
                </div>
                <div className="flex_props">
                  <Button
                    style={{ fontSize: "18px", textDecoration: "none" }}
                    color="link"
                    onClick={this.toggle}
                  >
                    Upload study material
                  </Button>
                  <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                      <span>Upload study material</span>
                    </ModalHeader>
                    <ModalBody>
                    Name: <Input type="text"></Input>
                    Description: <Input type="text"></Input>
                    File:<Input type="file" name="file" />
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={this.toggle}>
                      <i className="iconsminds-save"> Save</i>
                      </Button>{" "}
                      <Button color="secondary" onClick={this.toggle}>
                        Cancel
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <Button
                    style={{ fontSize: "18px", textDecoration: "none" }}
                    color="link"
                    onClick={this.toggleRight}
                  >
                    View study materials
                  </Button>
                </div>
                <Modal
                  isOpen={this.state.modalRight}
                  toggle={this.toggleRight}
                  wrapClassName="modal-right"
                >
                  <ModalHeader toggle={this.toggleRight}>
                    Study material
                  </ModalHeader>
                  <ModalBody>
                  <Card className="d-flex flex-row mb-4">
            <NavLink to="/app/ui/cards" className="d-flex">
              <ThumbnailImage rounded src="https://www.materialui.co/materialIcons/editor/attach_file_black_192x192.png" alt="Card image cap" className="m-4" />
            </NavLink>
            <div className=" d-flex flex-grow-1 min-width-zero">
              <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                <div className="min-width-zero">
                  <NavLink to="/app/ui/cards">
                    <CardSubtitle className="truncate mb-1">chapter3.zip</CardSubtitle>
                  </NavLink>
                  <CardText className="text-muted text-small mb-2">by Uday Singh</CardText>
                  <Button outline size="xs" color="primary">Download</Button>
                </div>
              </CardBody>
            </div>
          </Card>

          <Card className="d-flex flex-row mb-4">
            <NavLink to="/app/ui/cards" className="d-flex">
              <ThumbnailImage rounded src="https://www.materialui.co/materialIcons/editor/attach_file_black_192x192.png" alt="Card image cap" className="m-4" />
            </NavLink>
            <div className=" d-flex flex-grow-1 min-width-zero">
              <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                <div className="min-width-zero">
                  <NavLink to="/app/ui/cards">
                    <CardSubtitle className="truncate mb-1">chapter3.zip</CardSubtitle>
                  </NavLink>
                  <CardText className="text-muted text-small mb-2">by Uday Singh</CardText>
                  <Button outline size="xs" color="primary">Download</Button>
                </div>
              </CardBody>
            </div>
          </Card>

          <Card className="d-flex flex-row mb-4">
            <NavLink to="/app/ui/cards" className="d-flex">
              <ThumbnailImage rounded src="https://www.materialui.co/materialIcons/editor/attach_file_black_192x192.png" alt="Card image cap" className="m-4" />
            </NavLink>
            <div className=" d-flex flex-grow-1 min-width-zero">
              <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                <div className="min-width-zero">
                  <NavLink to="/app/ui/cards">
                    <CardSubtitle className="truncate mb-1">chapter3.zip</CardSubtitle>
                  </NavLink>
                  <CardText className="text-muted text-small mb-2">by Uday Singh</CardText>
                  <Button outline size="xs" color="primary">Download</Button>
                </div>
              </CardBody>
            </div>
          </Card>
          <Card className="d-flex flex-row mb-4">
            <NavLink to="/app/ui/cards" className="d-flex">
              <ThumbnailImage rounded src="https://www.materialui.co/materialIcons/editor/attach_file_black_192x192.png" alt="Card image cap" className="m-4" />
            </NavLink>
            <div className=" d-flex flex-grow-1 min-width-zero">
              <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                <div className="min-width-zero">
                  <NavLink to="/app/ui/cards">
                    <CardSubtitle className="truncate mb-1">chapter3.zip</CardSubtitle>
                  </NavLink>
                  <CardText className="text-muted text-small mb-2">by Uday Singh</CardText>
                  <Button outline size="xs" color="primary">Download</Button>
                </div>
              </CardBody>
            </div>
          </Card>

          <Card className="d-flex flex-row mb-4">
            <NavLink to="/app/ui/cards" className="d-flex">
              <ThumbnailImage rounded src="https://www.materialui.co/materialIcons/editor/attach_file_black_192x192.png" alt="Card image cap" className="m-4" />
            </NavLink>
            <div className=" d-flex flex-grow-1 min-width-zero">
              <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                <div className="min-width-zero">
                  <NavLink to="/app/ui/cards">
                    <CardSubtitle className="truncate mb-1">Sarah Kortney</CardSubtitle>
                  </NavLink>
                  <CardText className="text-muted text-small mb-2">Executive Director</CardText>
                  <Button outline size="xs" color="primary">Edit</Button>
                </div>
              </CardBody>
            </div>
          </Card>

          <Card className="d-flex flex-row mb-4">
            <NavLink to="/app/ui/cards" className="d-flex">
              <ThumbnailImage rounded src="https://www.materialui.co/materialIcons/editor/attach_file_black_192x192.png" alt="Card image cap" className="m-4" />
            </NavLink>
            <div className=" d-flex flex-grow-1 min-width-zero">
              <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                <div className="min-width-zero">
                  <NavLink to="/app/ui/cards">
                    <CardSubtitle className="truncate mb-1">Sarah Kortney</CardSubtitle>
                  </NavLink>
                  <CardText className="text-muted text-small mb-2">Executive Director</CardText>
                  <Button outline size="xs" color="primary">Edit</Button>
                </div>
              </CardBody>
            </div>
          </Card>
                  </ModalBody>
                  <ModalFooter>
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
              <CardImg
                top
                width="100%"
                src="/assets/img/chocolate-cake-thumb.jpg"
                alt="Card image cap"
              />
              <CardBody>
                <CardTitle>Chemistry</CardTitle>
                <div className="flex_props">
                  <CardSubtitle>Ms Shobhita Dhulipala</CardSubtitle>
                  <span className="card_time">4:30 PM</span>
                </div>
                <Button
                  style={{ fontSize: "18px", textDecoration: "none" }}
                  color="link"
                  onClick={this.toggleRight}
                >
                  Upload study material
                </Button>
                <Button
                  style={{ fontSize: "18px", textDecoration: "none" }}
                  color="link"
                  onClick={this.toggleRight}
                >
                  View study materials
                </Button>
              </CardBody>
            </Card>
          </Colxx>
          <Colxx md="6" lg="4" className="mb-4">
            <Card>
              <CardImg
                top
                width="100%"
                src="/assets/img/chocolate-cake-thumb.jpg"
                alt="Card image cap"
              />
              <CardBody>
                <CardTitle>Chemistry</CardTitle>
                <div className="flex_props">
                  <CardSubtitle>Ms Shobhita Dhulipala</CardSubtitle>
                  <span className="card_time">4:30 PM</span>
                </div>
                <Button
                  style={{ fontSize: "18px", textDecoration: "none" }}
                  color="link"
                  onClick={this.toggleRight}
                >
                  Upload study material
                </Button>
                <Button
                  style={{ fontSize: "18px", textDecoration: "none" }}
                  color="link"
                  onClick={this.toggleRight}
                >
                  View study materials
                </Button>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(StudyMaterial);
