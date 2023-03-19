import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ILoginRes } from '../Model/user.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  private userService = inject(AuthService);
  private router = inject(Router);
  erroMsg: string = '';
  form: FormGroup;
  subscription!: Subscription;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      fullname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.form.get('fullname')?.setValue('Monir Zaman');
    this.form.get('email')?.setValue('zaman5@miu.edu');
    this.form.get('password')?.setValue('123');
  }

  signup() {
    if (this.form.valid) {
      this.subscription = this.userService
        .signup(this.getFullName(), this.getEmail(), this.getPassword())
        .subscribe((res: ILoginRes) => {
          console.log('signup res: ', res);
          if (res.success == true) {
            this.userService.saveLoggedinState(res.data);
            this.erroMsg = '';
            //redirect to home
            this.router.navigate(['']);
          } else {
            this.erroMsg = res.data.msg || '';
          }
        });
    }
  }

  getFullName() {
    return this.form.get('fullname')?.value;
  }

  getEmail() {
    return this.form.get('email')?.value;
  }

  getPassword() {
    return this.form.get('password')?.value;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
