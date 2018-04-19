import {Component, Input, OnInit} from '@angular/core';
import {CognitoPaginationService} from './cognito-pagination.service';

@Component({
  selector: 'cognito-pagination',
  templateUrl: './cognito-pagination.component.html',
  styleUrls: ['./cognito-pagination.component.scss']
})
export class CognitoPaginationComponent implements OnInit {
  @Input() initialToken: string;
  tokenList: string[] = [''];
  lastTokenUndefined = false;
  private refreshInProgress: boolean;

  constructor(private cognitoPaginationService: CognitoPaginationService) { }

  ngOnInit() {
    this.tokenList.push(this.initialToken);
    this.cognitoPaginationService.onUsersListRefreshed.subscribe(
      (nextToken) => {
        this.refreshInProgress = false;

        if (typeof nextToken !== 'undefined') {
          this.lastTokenUndefined = false;
          this.tokenList.push(nextToken);
        } else if (this.tokenList.length === 2) {
          this.tokenList = [''];
        }

        if (nextToken === undefined) {
          this.lastTokenUndefined = true;
        }
      }
    );
  }

  next() {
    if (this.refreshInProgress) {
      return;
    }

    this.refreshInProgress = true;
    this.cognitoPaginationService.paginationClick(this.tokenList[this.tokenList.length - 1]);
  }

  previous() {
    if (this.refreshInProgress) {
      return;
    }

    this.refreshInProgress = true;
    const previousPageIndex = Math.max(this.tokenList.length - (this.lastTokenUndefined ? 2 : 3), 0);

    this.cognitoPaginationService.paginationClick(this.tokenList[previousPageIndex]);

    if (previousPageIndex >= 0) {
      this.tokenList = this.tokenList.slice(0, previousPageIndex + 1);
    }
  }
}
