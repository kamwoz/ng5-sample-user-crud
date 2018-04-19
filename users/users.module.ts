import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { UsersListComponent } from './users-list/users-list.component';
import { UserService } from '../../services/user.service';
import { UserShowComponent } from './user-show/user-show.component';
import { UsersResolver } from '../../resolvers/users.resolver';
import { UserResolver } from '../../resolvers/user.resolver';
import { UserEditComponent } from './user-edit/user-edit.component';
import { MatInputModule, MatSliderModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { UsersRoutingModule } from './users.routing';
import { SharedModule } from '../../shared.module';
import {CognitoPaginationComponent} from './cognito-pagination/cognito-pagination.component';
import {CognitoPaginationService} from './cognito-pagination/cognito-pagination.service';


@NgModule({
  declarations: [
    UsersListComponent,
    UserShowComponent,
    UserEditComponent,
    CognitoPaginationComponent
  ],
  imports: [
    MatSliderModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    UsersRoutingModule,
    SharedModule
  ],
  providers: [
    UserService,
    UsersResolver,
    UserResolver,
    CognitoPaginationService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class UsersModule { }
