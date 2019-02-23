import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';

@Component({
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  pageData = [];

  constructor(private backend: BackendService) { }

  ngOnInit() {
    this.backend.getContacts()
      .then((data: Array<Object>) => {
        this.pageData = data;
      });
  }
}