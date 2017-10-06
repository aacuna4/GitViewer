import { Meteor } from 'meteor/meteor';
import childProcess from 'child_process';
import path from 'path';
import Future from 'fibers/future'
import {Commits, Diffs} from '../imports/api/collections/Commits.js'
import { Mongo } from 'meteor/mongo'


Meteor.startup(() => {
  // code to run on server at startup
 repoPath = null;
});

Meteor.methods({
    getCommits: function(filepath){
        //this.unblock();     
        Commits.remove({});
        let future = new Future();
        // let filepath = path.normalize('/home/laptop/Documents/Development/Repositories/bootsnap'); // need to have the user input the path
        repoPath = path.normalize(filepath); // need to have the user input the path
        let cmdHash = 'git -C ' + repoPath + ' log --pretty=format:"%h %s"';

       childProcess.exec(cmdHash, function(err, out, stderr){
           if(err){
               console.log(err);
               return;
           }

             hashArr = out.split("\n").map(function(commit){
                let commitObj = {};
                commitObj.hash = commit.substring(0,7);
                commitObj.message = commit.substring(7,commit.length);

                return commitObj;
             });
             future.return(hashArr);
        });

        let commits = future.wait();

        commits.forEach(function(element) {
            Commits.insert(element);
        }, this); 
    },

    getDiff: function(commitHash){
        Diffs.remove({});
        let future = new Future();
        // let filepath = path.normalize('/home/laptop/Documents/Development/Repositories/bootsnap'); // need to have the user input the path
        let cmdHash = 'git -C ' + repoPath + ' diff ' + commitHash;
        // console.log(cmdHash);
       childProcess.exec(cmdHash, function(err, out, stderr){
           if(err){
               console.log(err);
               return;
           }

            // console.log(out);
            future.return(out);
        });

        let diffResult = future.wait();
        Diffs.insert({hash: commitHash, diff: diffResult});
    }
});