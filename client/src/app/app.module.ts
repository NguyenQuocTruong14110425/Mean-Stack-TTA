import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module'
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'
import { AppComponent } from './app.component';
import { NavbarComponent } from './compoments/navbar/navbar.component';
import { HomeComponent } from './compoments/home/home.component';
import { DashboardComponent } from './compoments/dashboard/dashboard.component';
import { RegisterComponent } from './compoments/register/register.component';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './compoments/login/login.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
