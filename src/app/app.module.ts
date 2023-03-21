import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from './shared/shared.module';
import { FilterComponent } from './dashboard/filter/filter.component';
import { PriceFilterPipe } from './pipe/price-filter.pipe';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { SearchByTextComponent } from './search-by-text/search-by-text.component';
import { SearchNearByComponent } from './search-near-by/search-near-by.component';
import { AuthService } from './services/auth.service';

function initializeAppFactory(authService: AuthService) {
  const data: any = localStorage.getItem('APPSTATE');
  if (data) {
    const dataJson = JSON.parse(data);
    authService.saveLoggedinState({
      _id: dataJson._id,
      email: dataJson.email,
      fullname: dataJson.fullname,
      jwt: dataJson.jwt,
    });
  }
  return () => {};
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    FilterComponent,
    PriceFilterPipe,
    SearchByTextComponent,
    SearchNearByComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    SharedModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [AuthService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
