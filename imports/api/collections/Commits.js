import { Mongo } from 'meteor/mongo'

export const Commits = new Mongo.Collection('commits');
export const Diffs = new Mongo.Collection('diffs');

Commits.schema = new SimpleSchema({
    hash: {type: String},
    message: {type: String}
  });

Diffs.schema = new SimpleSchema({
  hash: {type: String},
  diff: {type: String}
});
