import { Component, inject } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private subscription!: Subscription;
  isLoggedIn = false;

  ngOnInit(): void {
    this.subscription = this.authService.loggedInState$.subscribe(
      (loggedinStatus) => {
        this.isLoggedIn = loggedinStatus;
      }
    );
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
