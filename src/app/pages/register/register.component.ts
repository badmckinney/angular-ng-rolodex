import { Component } from '@angular/core';
import { BackendService } from '../../services/backend.service';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  formData: {
    username: string,
    password: string,
    name: string,
    email: string,
    address: string
  } = {
      username: '',
      password: '',
      name: '',
      email: '',
      address: ''
    }

  constructor(private backend: BackendService) { }
}