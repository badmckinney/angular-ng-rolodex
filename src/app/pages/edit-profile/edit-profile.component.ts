import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})

export class EditProfileComponent implements OnInit {
  editProfileFormData: {
    username: string,
    name: string,
    email: string,
    address: string
  } = {
      username: '',
      name: '',
      email: '',
      address: ''
    }

  constructor(
    private backend: BackendService,
    private router: Router
  ) { }

  editProfile() {
    this.backend.editProfile(this.editProfileFormData)
      .then(() => {
        this.router.navigate(['/profile']);
      })
      .catch((err) => {
        this.router.navigate(['/edit-profile']);
      });
  }

  ngOnInit() {
    this.backend.getProfile()
      .then((data) => {
        for (var key in data) {
          if (this.editProfileFormData.hasOwnProperty(key)) {
            this.editProfileFormData[key] = data[key];
          }
        }
      });
  }
}