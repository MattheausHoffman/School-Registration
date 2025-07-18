import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { StudentRegisterComponent } from './components/student-register/student-register.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MY_DATE_FORMATS } from './models/date-format';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { TeacherRegisterComponent } from './components/teacher-register/teacher-register.component';
import { LoginComponent } from './components/login/login.component';
import { MatDialogModule } from '@angular/material/dialog';
import { StudentLoggedComponent } from './pages/student-logged/student-logged.component';
import { HttpClientModule } from '@angular/common/http';
registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    StudentRegisterComponent,
    TeacherRegisterComponent,
    LoginComponent,
    StudentLoggedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,
    NgxMaskDirective,
    HttpClientModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    provideNgxMask(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
