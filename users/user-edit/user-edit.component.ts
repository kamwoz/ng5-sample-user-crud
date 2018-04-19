import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService} from '../../../services/user.service';
import {AlertService} from '../../../services/alert.service';
import {User} from '../../../models/user';
import {Dictionaries} from '../../../services/dictionary.service';
import {UtilService} from '../../../services/util.service';
import {ValidationService} from '../../../services/validation.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss', '../users.scss']
})
export class UserEditComponent implements OnInit {
  isInEditMode: boolean; // if its not edit mode - that means its create account mode
  user: User = <any>{};
  dictionaries: Dictionaries;
  form: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private alert: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    const urlSegments: any = <any>(this.activatedRoute.url);
    this.isInEditMode = urlSegments.value[1].path === 'edit';

    if (this.isInEditMode) {
      this.user = this.activatedRoute.snapshot.data['user'];
    }
    this.dictionaries = this.activatedRoute.snapshot.data['dictionary'];

    this.form = new FormGroup({
      first_name: new FormControl(
        '',
        Validators.required
      ),
      last_name: new FormControl(
        '',
        Validators.required
      ),
      email: new FormControl(
        '',
        [Validators.required, ValidationService.emailValidator]
      )
    });

    if (!this.isInEditMode) {
      this.form.addControl('password', new FormControl(
        '',
        [Validators.required, Validators.minLength(6)]));
    }
  }

  onSubmit() {
    if (this.isInEditMode) {
      this.userService.accountEdit(<User>this.user).subscribe(
        response => {
          this.alert.success('user.notification.account_edited');
          this.router.navigate(['users']);
        },
        error => {
          this.alert.error(UtilService.generateErrorFromErrorFields(error.error.error_fields));
        }
      );
    } else {
      this.userService.accountCreate(<User>this.user).subscribe(
        (response: User) => {
          this.alert.success('user.notification.account_created');
          // this.router.navigate([`user/edit/${response.sub}`]);
          this.router.navigate(['users']);
        },
        error => {
          this.alert.error(UtilService.generateErrorFromErrorFields(error.error.error_fields));
        }
      );
    }
  }

  onEmailChanged(newValue) {
    if (newValue != undefined) {
      this.user.email = newValue.toLowerCase();
    }
  }

  onCancel() {
    this.router.navigate(['users']);
  }
}
