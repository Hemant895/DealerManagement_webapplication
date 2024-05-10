import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DealerTableComponent } from './dealer-table/dealer-table.component';
import { DealerFormComponent } from './dealer-form/dealer-form.component';

const routes: Routes = [
  {
    path:'',
    component:DealerFormComponent
  },
  {
    path:'dealerform',
    component:DealerFormComponent
  },
  {
    path:'dealerform/:id',
    component:DealerFormComponent
  },
  {
    path:'dealerlist',
    component:DealerTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
