import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { CreateAndUpdateComponent } from './pages/create-and-update/create-and-update.component';

const routes: Routes = [{
  path:'',component:MainComponent
},{
  path:'create-or-modify',component:CreateAndUpdateComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
