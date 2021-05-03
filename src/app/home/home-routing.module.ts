import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home.component';
import {MenuComponent} from './menu/menu.component'
import {ViewMenuComponent} from './view-menu/view-menu.component';
import {EditMenuComponent} from './edit-menu/edit-menu.component'
const routes: Routes = [
	{
		path:'',
		component: HomeComponent
	},
	{
		path:'create-menu',
		component: MenuComponent
	},
	{
		path:'view-menu/:id',
		component: ViewMenuComponent
	},
	{
		path:'edit-menu/:id',
		component: EditMenuComponent
	},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
