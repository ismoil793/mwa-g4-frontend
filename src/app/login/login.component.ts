import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ILoginRes } from '../Model/user.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private userService = inject(AuthService);
  private router = inject(Router);
  form: FormGroup;
  subscription!: Subscription;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', Validators.required],
      remember: [false],
    });
  }

  ngOnInit(): void {
    this.form.get('email')?.setValue('zaman@miu.edu');
    this.form.get('password')?.setValue('123');
  }

  login() {
    if (this.form.valid) {
      this.subscription = this.userService
        .login(this.getEmail(), this.getPassword())
        .subscribe((res: ILoginRes) => {
          console.log('login res: ', res);

          console.log('res.success: ', res.success);
          if (res.success == true) {
            this.userService.saveLoggedinState(res.data);
            //redirect to home
            this.router.navigate(['']);
          }
        });
    }
  }

  getEmail() {
    return this.form.get('email')?.value;
  }

  getPassword() {
    return this.form.get('password')?.value;
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription?.unsubscribe();
  }
}
