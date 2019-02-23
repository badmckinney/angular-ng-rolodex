import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';

@Component({
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})

export class AddContactComponent implements OnInit {
  addContactFormData: {
    name: string,
    address: string,
    mobile: string,
    work: string,
    home: string,
    email: string,
    twitter: string,
    instagram: string,
    github: string,
    created_by: number

  } = {
      name: '',
      address: '',
      mobile: '',
      work: '',
      home: '',
      email: '',
      twitter: '',
      instagram: '',
      github: '',
      created_by: 0
    }

  constructor(
    private backend: BackendService,
    private router: Router,
    private session: SessionService
  ) { }

  addContact() {
    return this.backend.addContact(this.addContactFormData)
      .then(() => {
        this.router.navigate(['/add-contact']);
        for (var key in this.addContactFormData) {
          this.addContactFormData[key] = '';
        }
      });
  }

  ngOnInit() {
    let user = this.session.getSession();
    this.addContactFormData.created_by = user.id;
  }
}