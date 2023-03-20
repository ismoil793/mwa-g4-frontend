import { Component, inject } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
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

  onSearch(value: string) {
    console.log('header search: ', value);
    this.router.navigate(['search'], {
      queryParams: { searchquery: value },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
