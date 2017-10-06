import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Commits, Diffs } from '../../../imports/api/collections/Commits.js'

// App component - represents the whole app

class Commit extends Component {
    renderTasks() {
        return this.props.commits.map((commit) => (
          <tr key={commit._id}><th><a href="#" onClick={this.getDiff.bind(this, commit.hash)}>{commit.hash}</a></th><th>{commit.message}</th></tr>
        ));
    }

    getDiff(commitHash){
      event.preventDefault();
      Meteor.apply('getDiff', [commitHash], { returnStubValue: true });
    }

    render() {
      return (
        <div className="container">
          <table>
            <tbody>
              {this.renderTasks()}
            </tbody>
          </table>
          <div></div>
        </div>
      );
    }
}

Commit.propTypes = {
  commits: PropTypes.array.isRequired,
};



export default createContainer(() => {
  return {
    commits: Commits.find({}).fetch(),
  };
}, Commit );