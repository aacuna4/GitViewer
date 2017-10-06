import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

// App component - represents the whole app

export default class Menu extends Component {
    handleSubmitClick = (event) => {
        event.preventDefault();
        const name = this._name.value;
        Meteor.apply('getCommits', [name], { returnStubValue: true });
    // do something with `name`
    }

  render() {
    return (
      <div className="ui action input">
        <input type="text" placeholder="Search..."/>
        <button className="ui icon button">
          <i className="search icon"></i>
        </button>
      </div>
    );
  }
}
