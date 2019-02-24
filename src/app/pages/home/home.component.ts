import { Component } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';
import { IfStmt } from '@angular/compiler';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  searchTerm = ''
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

  filterContacts() {
    if (!this.searchTerm) {
      return this.pageData = [];
    }

    this.backend.filterContacts(this.searchTerm)
      .then((data: Array<Object>) => {
        this.pageData = data;
        this.pageData.forEach(contact => {
          contact.created_at = new Date(contact.created_at).toLocaleDateString();
          contact.updated_at = new Date(contact.updated_at).toLocaleDateString();
        });
      });
  }
}