import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addNote, editNote, deleteNote } from '../store/actions/noteActions';
import './home.css';
class Home extends React.Component {
  state = {
    id: '',
    title: '',
    description: '',
    assignTo: null,
    displayAdd: false,
    displayEdit: false,
  };

  onClickSubmit = () => {
    const { title, description, assignTo, displayEdit, id } = this.state;
    if (displayEdit) {
      this.props.editNote({
        [id]: { title, description, assignTo, completed: false },
      });
    } else {
      this.props.addNote({
        [Date.now()]: { title, description, assignTo, completed: false },
      });
    }
    this.setState({
      displayAdd: false,
      title: '',
      description: '',
      assignTo: null,
      displayEdit: false,
    });
  };
  onClickEdit = (id) => {
    this.setState({ id, ...this.props.notes[id], displayEdit: id });
  };
  onClickDelete = (id) => {
    this.props.deleteNote({ id });
  };
  onClickComplete = (id) => {
    this.props.editNote({
      [id]: {
        ...this.props.notes[id],
        completed: true,
        completedAt: new Date().toLocaleString(),
      },
    });
  };
  renderNoteForm = () => {
    const { title, description } = this.state;
    const { users } = this.props;
    return (
      <div>
        <div>
          Title
          <br />
          <input
            type='text'
            name='title'
            value={title}
            onChange={(e) => this.setState({ title: e.target.value })}
          />
        </div>
        <div>
          Description
          <br />
          <input
            type='text'
            name='description'
            value={description}
            onChange={(e) => this.setState({ description: e.target.value })}
          />
        </div>
        <div>
          Assign
          <br />
          <select
            name='user'
            onChange={(e) => this.setState({ assignTo: e.target.value })}
          >
            <option key='random' value=''>
              Select User
            </option>
            {Object.keys(users).map((id) => (
              <option key={id} value={id}>
                {users[id].name}
              </option>
            ))}
          </select>
        </div>
        <button onClick={this.onClickSubmit}>Submit</button>
      </div>
    );
  };
  renderListNotes = (displayCompleted = false) => {
    const { notes, users } = this.props;
    const renderData = Object.keys(notes).map((id) => {
      console.log(notes[id].assignTo);
      if (notes[id].completed === displayCompleted)
        return (
          <div key={id} className='notes'>
            <p>
              title : {notes[id].title}
              <br />
              {notes[id].description}
              <br />
              Assign TO : {users[notes[id].assignTo].name}
            </p>
            {!displayCompleted && (
              <div>
                <button onClick={() => this.onClickEdit(id)}>Edit</button>
                <button onClick={() => this.onClickDelete(id)}>Delete</button>
                <button onClick={() => this.onClickComplete(id)}>
                  Complete Task
                </button>
                {this.state.displayEdit === id && this.renderNoteForm()}
              </div>
            )}
            {displayCompleted && (
              <div>
                <br />
                Completed AT : {notes[id].completedAt}
              </div>
            )}
          </div>
        );
    });
    if (renderData.length === 0) {
      return <div>No Notes</div>;
    }
    return renderData;
  };
  render() {
    const { displayAdd, displayEdit } = this.state;
    return (
      <div>
        <Link className='absolute-right-top' to='/users'>
          Go To User
        </Link>
        {Object.keys(this.props.users).length === 0 && (
          <span>No User Found!!! Please Add first</span>
        )}
        <div className='container'>
          <table style={{ width: '100%' }}>
            <thead>
              <tr>
                <th style={{ width: '50%' }}>In Progress</th>
                <th style={{ width: '50%' }}>Completed</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className='in-progress'>{this.renderListNotes()}</div>
                </td>
                <td>
                  <div className='completed'>{this.renderListNotes(true)}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {displayAdd && this.renderNoteForm()}
        <button
          className='absolute-bottom'
          onClick={() => this.setState({ displayAdd: true })}
        >
          Add Note
        </button>
      </div>
    );
  }
}

function mapStateToProps({ user, note }) {
  return { users: user.users, notes: note.notes };
}
export default connect(mapStateToProps, { addNote, editNote, deleteNote })(
  Home
);
