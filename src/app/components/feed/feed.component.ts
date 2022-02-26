import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { FeedService } from 'src/app/services/feed.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogCommentComponent } from '../dialog-comment/dialog-comment.component';
import { ScoreService } from 'src/app/services/score.service';
import { IScoreRequest } from 'src/app/models/score-request.interface';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  feeds: any[];
  innerWidth: any;
  milliSeconds: number;

  constructor(public dialog: MatDialog,
    private readonly feedService: FeedService,
    private readonly scoreService: ScoreService
  ) { }

  ngOnInit(): void {
    this.getFeed();
  }

  getFeed() {
    this.feedService.getFeed().subscribe(
      (data: any) => {
        this.feeds = data;
        console.log('feeds', this.feeds);
      },
      (err) => {
        console.log('Error service feed', err.status);
      }
    );
  }

  openDialog(data): void {
    const dialogRef = this.dialog.open(DialogCommentComponent, {
      width: '250px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  focusOutFunction(event, id, type) {
    var timestamp = event['timeStamp'];
    var date = new Date(timestamp);
    const milliSeconds = date.getMilliseconds();
    const body: IScoreRequest = {
      'id': id,
      'type': type,
      'time': milliSeconds
    };
    this.getScore(body);
  }

  getScore(body: IScoreRequest) { 
    this.scoreService.postScore(body).subscribe(
      () => {
        console.log('Registered');
      },
      (err) => {
        console.log('Error service score', err.status);
      }
    );
  }
}
