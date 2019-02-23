import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TouchSequence } from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  user: {
    loggedIn: boolean,
    username: string,
    id: number
  } = {
      loggedIn: false,
      username: '',
      id: 0
    };

  constructor(
    private router: Router
  ) {
    let userString = window.localStorage.getItem('user');
    try {
      if (userString) { this.user = JSON.parse(userString); }
      else {
        this.user.loggedIn = false;
        this.user.username = '';
        this.user.id = 0;
      }
    } catch (err) {
      window.localStorage.removeItem('user');
      this.user.loggedIn = false;
      this.user.username = '';
      this.user.id = 0;
    }
  }

  getSession() {
    return this.user;
  }

  setSession(user) {
    this.user.username = user.username;
    this.user.id = user.id;
    this.user.loggedIn = true;

    let userString = JSON.stringify(this.user);
    window.localStorage.setItem('user', userString);
  }

  clearSession() {
    this.user.loggedIn = false;
    this.user.username = '';
    this.user.id = 0;
    window.localStorage.removeItem('user');
  }

  isLoggedIn() {
    return this.user.loggedIn;
  }
}