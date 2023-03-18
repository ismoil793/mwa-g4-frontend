import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AutoDetailComponent } from './auto-detail/auto-detail.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  {
    path: 'auto-detail/:autoMobilId',
    component: AutoDetailComponent,
  },
];

@NgModule({
  declarations: [AutoDetailComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AutomobileModule {}
