// import '../imports/startup/client/startup.js'
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import Commit from '../imports/ui/components/commits.jsx';
import Diff from '../imports/ui/components/diff.jsx';
import Menu from '../imports/ui/components/menu.jsx';
import Info from '../imports/ui/components/info.jsx';
 

Meteor.startup(() => {
  render(<Menu />, document.getElementById('render-menu'));  
  render(<Commit />, document.getElementById('render-commits'));
  render(<Diff />, document.getElementById('render-diff'));
  // render(<Info />, document.getElementById('render-info'));
  
  Meteor.apply('getCommits', ['/home/laptop/Documents/Development/Repositories/bootsnap'], { returnStubValue: true });
});