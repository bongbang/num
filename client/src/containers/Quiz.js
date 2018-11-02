import React, { Component } from 'react';
// import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { API } from 'aws-amplify';
import { PageHeader, ListGroup, ListGroupItem } from 'react-bootstrap';
// import { s3Upload } from '../libs/awsLib';
// import config from '../config';

export default class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      questions: []
    };
  }

  async componentDidMount() {
    // console.log('id: ' + this.props.match.params.id);
    try {
      const questions = await this.questions();
      this.setState({ questions });
      console.log(this.state.questions);
    } catch (e) {
      alert(e);
    }
  }

  questions() {
    return API.get('num', `/module/${this.props.match.params.id}`);
  }

  renderNotesList(notes) {
    return [{}].concat(notes).map(
      (note, i) =>
        i !== 0 ? (
          <ListGroupItem
            key={note.noteId}
            href={`/notes/${note.noteId}`}
            onClick={this.handleNoteClick}
            header={note.content.trim().split('\n')[0]}
          >
            {'Created: ' + new Date(note.createdAt).toLocaleString()}
          </ListGroupItem>
        ) : (
          <ListGroupItem
            key="new"
            href="/notes/new"
            onClick={this.handleNoteClick}
          >
            <h4>
              <b>{'\uFF0B'}</b> Create a new note
            </h4>
          </ListGroupItem>
        )
    );
  }

  renderNotes() {
    return (
      <div className="notes">
        <PageHeader>Questions</PageHeader>
        <p>Look in console for questions.</p>
        <ListGroup>
          {!this.state.isLoading && this.renderNotesList(this.state.questions)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return <div className="Home">{this.renderNotes()}</div>;
  }
}
