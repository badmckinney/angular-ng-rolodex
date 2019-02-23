import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  pageData: {
    id: number,
    name: string,
    created_at: string,
    updated_at: string,
    address: string,
    mobile: string,
    work: string,
    home: string,
    email: string,
    twitter: string,
    instagram: string,
    github: string
  } = {
      id: 0,
      name: '',
      created_at: '',
      updated_at: '',
      address: '',
      mobile: '',
      work: '',
      home: '',
      email: '',
      twitter: '',
      instagram: '',
      github: ''
    }

  constructor(
    private backend: BackendService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    router.events.forEach((e) => {
      if (e instanceof NavigationEnd) {
        this.pageData.id = e.id;
      }
    });
    this.pageData.id = 0;
  }

  ngOnInit() {
    this.backend.openContact(this.pageData.id)
      .then((data) => {
        for (var key in data) {
          this.pageData[key] = data[key];
        }
      });
  }
}
