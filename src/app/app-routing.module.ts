import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChansonsComponent } from './chansons/chansons.component';
import { AuthGuard } from './guards/secure.guard';



const routes: Routes = [
  {path: "chansons", component :ChansonsComponent,canActivate:[AuthGuard],
  data : {roles:['ADMIN']}}
  ];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
