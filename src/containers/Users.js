import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addUser, editUser, deleteUser } from '../store/actions';
import './users.css';
class Users extends Component {
  state = {
    id: null,
    displayAdd: false,
    displayEdit: null,
    name: '',
    designation: '',
  };
  onClickSubmit = () => {
    const { name, designation, displayEdit, id } = this.state;
    if (displayEdit) {
      this.props.editUser({ [id]: { name, designation } });
    } else {
      this.props.addUser({ [Date.now()]: { name, designation } });
    }
    this.setState({
      displayAdd: false,
      name: '',
      designation: '',
      displayEdit: false,
    });
  };
  onClickEdit = (id) => {
    this.setState({ id, ...this.props.users[id], displayEdit: id });
  };
  onClickDelete = (id) => {
    this.props.deleteUser({ id });
  };
  renderListUsers = () => {
    const { users } = this.props;
    return Object.keys(users).map((id) => (
      <div key={id} className='user'>
        <p>
          Name:{users[id].name}
          <br />
          Designation:{users[id].designation}
        </p>
        <button onClick={() => this.onClickEdit(id)}>Edit</button>
        <button onClick={() => this.onClickDelete(id)}>Delete</button>
        {this.state.displayEdit === id && this.renderUserForm()}
      </div>
    ));
  };
  renderUserForm = () => {
    const { name, designation } = this.state;
    return (
      <div>
        <div>
          Name
          <br />
          <input
            type='text'
            name='name'
            value={name}
            onChange={(e) => this.setState({ name: e.target.value })}
          />
        </div>
        <div>
          Designation
          <br />
          <input
            type='text'
            name='designation'
            value={designation}
            onChange={(e) => this.setState({ designation: e.target.value })}
          />
        </div>
        <button onClick={this.onClickSubmit}>Submit</button>
      </div>
    );
  };
  render() {
    const { displayAdd } = this.state;
    return (
      <div>
        <Link className='absolute-right-top' to='/'>
          Go To Notes
        </Link>
        {Object.keys(this.props.users).length === 0 && (
          <span>No User Found!!! Please Add first</span>
        )}
        <br />
        {this.renderListUsers()}
        {displayAdd && this.renderUserForm()}
        <button
          className='absolute-bottom'
          onClick={() => this.setState({ displayAdd: true })}
        >
          Add User
        </button>
      </div>
    );
  }
}
function mapStateToProps({ user }) {
  return { users: user.users };
}
export default connect(mapStateToProps, { addUser, editUser, deleteUser })(
  Users
);
