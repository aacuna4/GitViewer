import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Diffs } from '../../../imports/api/collections/Commits.js'

// App component - represents the whole app

class Diff extends Component {
    renderDiff() {
        return this.props.diffs.map(function(diff){
            content = diff.diff;//.replace(/\n/g, "<br />");
            return content
        });
    }

  render() {
    return (
      <div className="diffContainer">
        {this.renderDiff()}
      </div>
    );
  }
}

Diff.propTypes = {
  diffs: PropTypes.array.isRequired,
};



export default createContainer(() => {
  return {
    diffs: Diffs.find({}).fetch()
  };
}, Diff );