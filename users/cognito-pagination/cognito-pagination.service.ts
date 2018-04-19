import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CognitoPaginationService {
  private onPaginationClickSubject = new Subject<string>();
  public onPaginationClick: Observable<string>;

  private onUsersListRefreshedSubject = new Subject<string>();
  public onUsersListRefreshed: Observable<string>;

  constructor() {
    this.onPaginationClick = this.onPaginationClickSubject.asObservable();
    this.onUsersListRefreshed = this.onUsersListRefreshedSubject.asObservable();
  }

  paginationClick(paginationToken) {
    this.onPaginationClickSubject.next(paginationToken);
  }

  usersListRefreshed(newToken) {
    this.onUsersListRefreshedSubject.next(newToken);
  }
}
