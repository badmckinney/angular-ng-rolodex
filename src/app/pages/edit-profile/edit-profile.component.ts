import { Component } from '@angular/core';
import { BackendService } from '../../services/backend.service';

@Component({
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})

export class EditProfileComponent {
  formData: {
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

  constructor(private backend: BackendService) { }
}