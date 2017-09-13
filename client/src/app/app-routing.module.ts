import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './compoments/home/home.component';
import { DashboardComponent } from './compoments/dashboard/dashboard.component';
import { RegisterComponent } from './compoments/register/register.component';
import { LoginComponent } from './compoments/login/login.component';
const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', component: HomeComponent },
];
@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(
        appRoutes)],
    providers: [],
    bootstrap: [],
    exports: [RouterModule]
})

export class AppRoutingModule { }
