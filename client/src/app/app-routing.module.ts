import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router'
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component'
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const appRoutes : Routes = [
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'**',
    component:HomeComponent
  }
];

@NgModule({
  declarations: [
  ],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports:[RouterModule]
})
export class AppRoutingModule { }
