import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { ILoginRes, IUser } from 'src/app/Model/user.model';
import { IuserStats, IuserStatsRes } from 'src/app/Model/userStats.model';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  private authService = inject(AuthService);
  private proileService = inject(ProfileService);

  erroMsg: string = '';
  form: FormGroup;
  authSubscription!: Subscription;
  statsSubscription!: Subscription;
  user!: IUser;
  stats! :IuserStats;
  statsuccess:boolean = false
  submitSuccess:boolean = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      longitude: ['', [Validators.required]],
      latitude: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.user = this.authService.getUserInfo();
    this.statsSubscription = this.proileService
      .userStats()
      .subscribe((res: IuserStatsRes) => {
        console.log('userStats res: ', res);
        if (res.success == true) {
         this.stats = res.data[0];
         this.statsuccess = true;
        } else {
          console.log('Error: get userStat failed')
        }
      });
    if (this.user.location?.coordinates) {
      this.form.get('longitude')?.setValue(this.user.location?.coordinates[0]);
      this.form.get('latitude')?.setValue(this.user.location?.coordinates[1]);
    }
  }

  handleClick() {
    if (this.form.valid) {
      this.authSubscription = this.proileService
        .updateUser(this.getLongitude(), this.getLatitude())
        .subscribe((res: ILoginRes) => {
          console.log('updateProfile res: ', res);
          if (res.success == true) {
            console.log('updatedProfile: success');
            //this.form.reset();
            this.submitSuccess = true;
            this.erroMsg = '';
          } else {
            this.erroMsg = res.data.msg || '';
          }
        });

      return;
    }
  }

  getLongitude(): number {
    return this.form.get('longitude')?.value;
  }

  getLatitude(): number {
    return this.form.get('latitude')?.value;
  }
}
