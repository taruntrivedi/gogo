import React, { Component } from 'react';
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
    ModalFooter
  } from "reactstrap";
import Switch from "react-switch";

class ModalRight extends Component{
    state={
        modalRight: false,
        checked: false,
    }

    handleChange(checked) {
        this.setState({ checked });
      }

    toggleRight = () => {
        console.log("toggled")
        this.setState(prevState => ({
          modalRight: !prevState.modalRight
        }));
      };

    render(){
        return(
            <Modal
            isOpen={this.props.open}
            toggle={this.props.toggleModal}
            wrapClassName="modal-right"
          >
            <ModalHeader toggle={this.props.toggleModal}>
              Attendance
            </ModalHeader>
            <ModalBody>
              <ul>
                <li name="item1">
                  student 1{" "}
                  <Switch
                    onChange={this.handleChange}
                    checked={this.state.checked}
                  />
                </li>
                <li name="item2">
                  student 2{" "}
                  <Switch
                    onChange={this.handleChange}
                    checked={this.state.checked}
                  />
                </li>
                <li name="item3">
                  student 3{" "}
                  <Switch
                    onChange={this.handleChange}
                    checked={this.state.checked}
                  />
                </li>
                <li name="item4">
                  student 4{" "}
                  <Switch
                    onChange={this.handleChange}
                    checked={this.state.checked}
                  />
                </li>
                <li name="item5">
                  student 5{" "}
                  <Switch
                    onChange={this.handleChange}
                    checked={this.state.checked}
                  />
                </li>
                <li name="item6">
                  student 6{" "}
                  <Switch
                    onChange={this.handleChange}
                    checked={this.state.checked}
                  />
                </li>
                <li name="item7">
                  student 7{" "}
                  <Switch
                    onChange={this.handleChange}
                    checked={this.state.checked}
                  />
                </li>
                <li name="item8">
                  student 8{" "}
                  <Switch
                    onChange={this.handleChange}
                    checked={this.state.checked}
                  />
                </li>
                <li name="item9">
                  student 9{" "}
                  <Switch
                    onChange={this.handleChange}
                    checked={this.state.checked}
                  />
                </li>
                <li name="item10">
                  student 10{" "}
                  <Switch
                    onChange={this.handleChange}
                    checked={this.state.checked}
                  />
                </li>
              </ul>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.props.toggleModal}>
                <i className="iconsminds-save"> Save</i>
              </Button>{" "}
              <Button color="secondary" onClick={this.props.toggleModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        )
    };


}

export default ModalRight;