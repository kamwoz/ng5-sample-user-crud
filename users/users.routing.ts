import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersListComponent } from './users-list/users-list.component';
import { UsersResolver } from '../../resolvers/users.resolver';
import { UserShowComponent } from './user-show/user-show.component';
import { UserResolver } from '../../resolvers/user.resolver';
import { UserEditComponent } from './user-edit/user-edit.component';
import {DictionaryResolver} from '../../resolvers/dictionary.resolver';
import {CanActivateViaAuthGuardService} from '../../services/guards/can-activate-via-auth-guard.service';

const routes: Routes = [
  {
    path: 'users',
    component: UsersListComponent,
    resolve: {
      users: UsersResolver,
      dictionary: DictionaryResolver,
    },
    canActivate: [CanActivateViaAuthGuardService]
  },
  {
    path: 'user/create',
    component: UserEditComponent,
    resolve: {
      dictionary: DictionaryResolver
    },
    canActivate: [CanActivateViaAuthGuardService]
  },
  {
    path: 'user/:sub',
    component: UserShowComponent,
    resolve: {
      user: UserResolver,
      dictionary: DictionaryResolver
    },
    canActivate: [CanActivateViaAuthGuardService]
  },
  {
    path: 'user/edit/:sub',
    component: UserEditComponent,
    resolve: {
      user: UserResolver,
      dictionary: DictionaryResolver
    },
    canActivate: [CanActivateViaAuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
