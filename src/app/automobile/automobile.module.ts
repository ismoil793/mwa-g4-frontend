import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AutoDetailComponent } from './auto-detail/auto-detail.component';
import { MyAutomobilesComponent } from './my-automobiles/my-automobiles.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  {
    path: 'auto-detail',
    component: AutoDetailComponent,
  },
  { path: 'myAutomobiles', component: MyAutomobilesComponent },
];

@NgModule({
  declarations: [AutoDetailComponent, MyAutomobilesComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AutomobileModule {}
