import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';

import { editUserDetails } from '../../actions';

class EditDetails extends Component {
  state = {
    firstName: this.props.firstName,
    lastName: this.props.lastName,
    email: this.props.email,
    phone: this.props.phone,
    open: true,
  };

  handleClose = () => {
    this.props.onUpdate();
    this.setState({
      open: false,
    });
  };

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>User Details</DialogTitle>
          <DialogContent>
            <DialogContentText>Update user details</DialogContentText>
            <form>
              <TextField
                margin="dense"
                id="firstName"
                name="firstName"
                label="FirstName"
                type="text"
                fullWidth
                value={this.state.firstName}
                onChange={this.handleChange}
              />
              <TextField
                margin="dense"
                name="lastName"
                id="name"
                label="LastName"
                type="text"
                fullWidth
                value={this.state.lastName}
                onChange={this.handleChange}
              />
              <TextField
                margin="dense"
                name="email"
                id="name"
                label="Email"
                type="text"
                fullWidth
                value={this.state.email}
                onChange={this.onChange}
              />
              <TextField
                margin="dense"
                name="phone"
                id="name"
                label="Phone"
                type="text"
                fullWidth
                value={this.state.phone}
                onChange={this.handleChange}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>Cancel</Button>
            <Button
              onClick={() => {
                this.props.click(
                  this.state.firstName,
                  this.state.lastName,
                  this.state.email,
                  this.state.phone,
                );
                this.handleClose();
              }}
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    firstName: state.userProfile.firstName,
    lastName: state.userProfile.lastName,
    email: state.userProfile.email,
    phone: state.userProfile.phone,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    click: (firstName, lastName, email, phone) => {
      dispatch(editUserDetails(firstName, lastName, email, phone));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDetails);
