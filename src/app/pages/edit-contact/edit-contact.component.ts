import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})

export class EditContactComponent implements OnInit {
  editContactFormData: {
    id: number,
    name: string,
    address: string,
    mobile: string,
    work: string,
    home: string,
    email: string,
    twitter: string,
    instagram: string,
    github: string,

  } = {
      id: 0,
      name: '',
      address: '',
      mobile: '',
      work: '',
      home: '',
      email: '',
      twitter: '',
      instagram: '',
      github: '',
    }

  constructor(
    private backend: BackendService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    router.events.forEach((e) => {
      if (e instanceof NavigationEnd) {
        this.editContactFormData.id = parseInt(e.url.slice(14));
      }
    });
  }

  editContact() {
    this.backend.editContact(this.editContactFormData.id, this.editContactFormData)
      .then(() => {
        this.router.navigate([`/contact/${this.editContactFormData.id}`]);
      })
      .catch((err) => {
        this.router.navigate([`/edit-contact/${this.editContactFormData.id}`]);
      });
  }

  ngOnInit() {
    this.backend.openContact(this.editContactFormData.id)
      .then((data) => {
        for (var key in data) {
          this.editContactFormData[key] = data[key];
        }
      });
  }
}