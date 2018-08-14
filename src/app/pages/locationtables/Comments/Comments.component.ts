import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { LocalDataSource } from 'ng2-smart-table';
import * as io from 'socket.io-client';

@Component({
  selector: 'ngx-comments',
  templateUrl: './Comments.component.html',
  styles: [`
    
      nb-card {
        transform: translate3d(0, 0, 0);
      }
    `],

})
export class locationCommentsComponent implements OnInit {
  settings = {
    mode: 'oncustom',
    actions: false,
    columns: {
      LocationID: {
        title: 'ID',
        type: 'string',
        show: false,
      },
      LocationAR_En: {
        title: 'Arabic Name',
        type: 'string',
        show: true,

      },
      userid: {
        title: 'English Name',
        type: 'string',
        show: false,

      },

      username: {
        title: "userName",
        type: 'string',
        show: false,

      },
      comments: {
        title: "Comment",
        type: 'string',
        show: true,

      },
      Approved: {
        title: "Approved",
        type: 'boolean',
        show: true,

      },
      CommentID: {
        title: "commentsID",
        type: "string",
        show: false
      },

      created: {
        title: "PostedTime",
        type: 'string',
        show: true,

      }

    },
  };
  buttonText:String="Not Approved"
  approved: Array<any>;
  notapproved: Array<any>;r
  source: LocalDataSource = new LocalDataSource();
  uriCategories = 'http://localhost:4000/RatingLocation';
  socket;

  constructor(private http: HttpClient) {
    this.socket = io('http://localhost:4000');

  }

  Flip(event) {
    console.log(event);
    this.http.get(`${this.uriCategories}/FlipApproval/${event.data.CommentID}`)
      .subscribe(res => {
        console.log(event.data.Approved)
       
      });
  }

  ngOnInit() {
    this.getAllComments()
    this.socket.on('flipped', () => {
      console.log("hellop");
      this.getAllComments();
    })
  };

  getAllComments(){
    this.getComments().subscribe(x => {
      let comments = JSON.parse(JSON.stringify(x));
      console.log("comments")
      this.notapproved = [];
      this.approved = [];
      this.buttonText="Not Approved"

      for (var i = 0; i < comments.length; i++) {
        var comment = {
          LocationID: String,
          LocationAR_En: String,
          userid: String,
          created: String,
          CommentID: String,
          username: String,
          comments: String,
          Approved: Boolean
        }
        comment.LocationID = comments[i].LocationID;
        comment.LocationAR_En = comments[i].LocationAR_En;
        comment.userid = comments[i].LocationComment.userid;
        comment.created = comments[i].LocationComment.created;
        comment.username = comments[i].LocationComment.username;
        comment.comments = comments[i].LocationComment.comments;
        comment.Approved = comments[i].LocationComment.Approved;
        comment.CommentID = comments[i].LocationComment._id
        if (!comments[i].LocationComment.Approved) {

          console.log("notaprooved"+i);
          this.notapproved.push(comment)
        }
        else {
          console.log("aprooved"+i);
          this.approved.push(comment);
        }

      }

      console.log(this.notapproved)

      this.source.load(this.notapproved);
 
      this.source.refresh();

    });
  }
  getComments() {

    return this
      .http
      .get(`${this.uriCategories}/getComments`).map(res => {
        return res;
      });
  }
  GetApproved(){
    if(this.buttonText=="Not Approved"){
    this.buttonText= "Approved"
    this.source.load(this.approved);
 
          this.source.refresh();
  }
  else{
    this.buttonText= "Not Approved"
    this.source.load(this.notapproved);
 
          this.source.refresh();
  }
}
}