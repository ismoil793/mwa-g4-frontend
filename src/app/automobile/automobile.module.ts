import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AutoDetailComponent } from './auto-detail/auto-detail.component';
import { AutoAddComponent } from './auto-add/auto-add.component';
import { ReactiveFormsModule } from "@angular/forms";
import { AutoEditComponent } from './auto-edit/auto-edit.component';
import { MyAutomobilesComponent } from './my-automobiles/my-automobiles.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  {
    path: 'auto-detail/:id',
    component: AutoDetailComponent,
  },
  { path: 'myAutomobiles', component: MyAutomobilesComponent },
  {
    path: 'auto-edit/:id',
    component: AutoEditComponent,
  },
  {
    path: 'auto-add',
    component: AutoAddComponent
  }
];

@NgModule({
  declarations: [AutoDetailComponent, AutoAddComponent, AutoEditComponent, MyAutomobilesComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule],
})
export class AutomobileModule {}
