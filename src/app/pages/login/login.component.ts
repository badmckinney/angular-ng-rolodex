import { Component } from '@angular/core';
import { BackendService } from '../../services/backend.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  formData: {
    username: string,
    password: string
  } = {
      username: '',
      password: ''
    }

  constructor(private backend: BackendService) { }
}