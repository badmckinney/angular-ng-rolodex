import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  pageData = [];

  constructor(
    private backend: BackendService,
    private router: Router
  ) { }

  deleteContact(id) {
    this.backend.deleteContact(id)
      .then(() => {
        this.router.navigate(['/contacts']);
      });
  }

  openContact(id) {
    this.backend.openContact(id);
  }

  ngOnInit() {
    this.backend.getContacts()
      .then((data: Array<Object>) => {
        this.pageData = data;
      });
  }
}