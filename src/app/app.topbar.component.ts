import { Component, OnInit } from '@angular/core';
import { AppComponent} from './app.component';
import { Router } from '@angular/router';

import { LogoutService } from './seguranca/logout.service';
import { ErrorHandlerService } from './core/error-handler.service';
import { AuthService } from './seguranca/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopbarComponent implements OnInit {

  constructor(public app: AppComponent,
              public auth: AuthService,
              private logoutService: LogoutService,
              private errorHandler: ErrorHandlerService,
              private router: Router) {}

  ngOnInit() {
  }

  logout() {
    this.logoutService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
