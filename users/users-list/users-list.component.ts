import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user';
import {AlertService} from '../../../services/alert.service';
import {Dictionaries, DictionaryService} from '../../../services/dictionary.service';
import {UtilService} from '../../../services/util.service';
import {ForgotPasswordService} from '../../login/services/forgot-password.service';
import {CognitoPaginationService} from '../cognito-pagination/cognito-pagination.service';
declare let $;

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss', '../users.scss']
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  dictionaries: Dictionaries;
  initialPaginationToken: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private alert: AlertService,
    public dictionaryService: DictionaryService,
    public passwordService: ForgotPasswordService,
    private cognitoPaginationService: CognitoPaginationService
  ) { }

  ngOnInit() {
    this.users = this.activatedRoute.snapshot.data['users'].users;
    this.initialPaginationToken = this.activatedRoute.snapshot.data['users'].pagination_token;
    this.dictionaries = this.activatedRoute.snapshot.data['dictionary'];

    this.cognitoPaginationService.onPaginationClick.subscribe(
      (paginationToken) => this.refreshUsersList(paginationToken)
    );
  }

  private refreshUsersList(paginationToken?) {
    this.userService.getUsers(paginationToken).subscribe(
      (cognitoUsers) => {
        this.users = cognitoUsers.users;
        this.cognitoPaginationService.usersListRefreshed(cognitoUsers.pagination_token);
      }
    );
  }

  showUser(event, sub) {
    const $me = $(event.target),
      $parent = $me.parent('td.action-cell');

    if ($parent.length === 0 && !$me.hasClass('action-cell') && event.target.tagName !== 'A' && event.target.tagName !== 'BUTTON') {
      this.router.navigate([`user/${sub}`]);
    }
  }

  deleteUser(userSub) {
    this.userService.accountDelete(userSub).subscribe(
      response => {
        this.alert.success('user.notification.account_removed');
        this.refreshUsersList();
      },
      error => {
        this.alert.error(UtilService.generateErrorFromErrorFields(error.error.error_fields));
      }
    );
  }

  resetPassword(user: User) {
    this.passwordService.forgotPassword(user.email).subscribe(
      () => this.alert.success({message: 'user.reset_password_success', params: {email: user.email}}),
      error => this.alert.error(UtilService.generateErrorFromErrorFields(error.error.error_fields))
    );
  }

  public fullName(user: User): string {
    let fullName = '';
    if (user.first_name !== undefined && user.first_name.length > 0) {
      fullName = user.first_name;
    }
    if (user.last_name !== undefined && user.last_name.length > 0) {
      if (fullName.length > 0) {
        fullName += ' ';
      }
      fullName += user.last_name;
    }
    return fullName;
  }
}
