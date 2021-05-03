import { Component, OnInit } from '@angular/core';
import {MenuService} from 'src/app/core/services/menu.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private menu:MenuService) { }
  menus:any[]= [];
  ngOnInit(): void {

  	this.menu.getMenus().subscribe((data)=>{
  		this.menus = data.data;
  	})
  }

}
