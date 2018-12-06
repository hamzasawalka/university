import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { QuestionsService } from './questions.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private qs: QuestionsService, private router:Router) { }

  canActivate() {
    if ( this.qs.isLoggedIn() )
      return true;
    else
      this.router.navigate(['/']);
  }
}