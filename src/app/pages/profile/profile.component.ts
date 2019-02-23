import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  pageData: {
    username: string,
    created_at: string,
    updated_at: string,
    name: string,
    email: string,
    address: string
  } = {
      username: '',
      created_at: '',
      updated_at: '',
      name: '',
      email: '',
      address: ''
    }

  constructor(private backend: BackendService) { }

  ngOnInit() {
    this.backend.getProfile()
      .then((data) => {
        for (var key in data) {
          this.pageData[key] = data[key];
        }
      });
  }
}
