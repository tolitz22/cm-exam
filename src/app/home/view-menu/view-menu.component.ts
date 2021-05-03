import { Component, OnInit } from '@angular/core';
import {MenuService} from 'src/app/core/services/menu.service';
import {MatDialog} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import {DeleteDialogComponent} from '../components/delete-dialog/delete-dialog.component';
import {Router} from '@angular/router';
@Component({
  selector: 'app-view-menu',
  templateUrl: './view-menu.component.html',
  styleUrls: ['./view-menu.component.scss']
})
export class ViewMenuComponent implements OnInit {

  constructor(private menu: MenuService, private route:ActivatedRoute,public dialog: MatDialog, private router:Router) { }

  menuData:any[] = [];
  idMenu:string |null ='';
  headers:any[] = [];
  dateMenu:string = '';  
  serviceSetName:string |null = '';

  ngOnInit(): void {
  	this.route.paramMap.subscribe((params)=>{
  		this.idMenu = params.get('id');

  		this.menu.viewMenu(this.idMenu).subscribe((data)=>{
  			console.log(data);

        this.headers = data.data.headers;
        this.menuData = data.data.menus;  		
        this.headers = this.headers.filter((item)=>{
          // console.log(item.name)
          return item.name != 'category' && item.name != 'description'
        })
        
        // console.log(this.headers)

        this.dateMenu = data.data.created_at; 
        this.serviceSetName = data.data.service_set_name;
      })
  		
  	})
  }


  deleteMenu(){
    if(this.idMenu != '' || this.idMenu != null){
      this.menu.deleteMenu(this.idMenu).subscribe((data)=>{
        console.log(data);
        this.router.navigateByUrl('/');
      })
    }
    
  }


  openDialog() {
    const dialogRef = this.dialog.open(DeleteDialogComponent,{
     
    height: '150px',
    width: '600px',
  });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result){
        this.deleteMenu()

      }
      

    });
  }

}
