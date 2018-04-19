import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {User} from '../../../models/user';
import {Dictionaries, DictionaryService} from '../../../services/dictionary.service';

@Component({
  selector: 'user-show',
  templateUrl: './user-show.component.html',
  styleUrls: ['./user-show.component.scss', '../users.scss']
})
export class UserShowComponent implements OnInit {
  user: User;
  dictionaries: Dictionaries;

  constructor(
    private activatedRoute: ActivatedRoute,
    public dictionaryService: DictionaryService) { }

  ngOnInit() {
    this.user = this.activatedRoute.snapshot.data['user'];
    this.dictionaries = this.activatedRoute.snapshot.data['dictionary'];
  }

  getPurposeLabel(purposeId) {
    let result = '';
    this.dictionaries.purpose.forEach((purpose) => {
      if (purpose.id === Number(purposeId)) {
        result = purpose.value;
      }
    });
    return result;
  }
}
