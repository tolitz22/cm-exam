import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import {MenuService} from 'src/app/core/services/menu.service';
import {MatDialog} from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid';
import {ModalComponent} from '../components/modal/modal.component';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {ResultModalComponent} from '../components/result-modal/result-modal.component';
import {UpdateDialogComponent} from '../components/update-dialog/update-dialog.component'
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.scss']
})
export class EditMenuComponent implements OnInit, OnDestroy {

  constructor(public dialog: MatDialog, private menu:MenuService, private route:ActivatedRoute) {}

  idMenu:string |null ='';
  headers:any = [];
  data:any =  [];

  serviceSetName:string ='';
  serviceSetDescription:string = '';
      
  wholeObject:any;

  isServiceSetNameError:boolean = false;
  isServiceSetDescError:boolean = false;
  serviceSetColor:string = '#424242';
  color="#eeeeee";
    colors:any[]= ['#ffebee', '#fffde7','#e8f5e9','#e8f5e9', '#e8eaf6','#fce4ec','#fff3e0','#efebe9',
    '#f5f5f5','#f3e5f5'
    ]  ;

    routerSubscription:Subscription|any;
    dataSubscription:Subscription|any;


     chooseColor(primary:string, secondary:string){
      this.color = secondary;
      this.serviceSetColor = primary;
    }  


  checkSecondaryColor = ()=>{
    if(this.serviceSetColor=='#ef5350'){
          this.color = this.colors[0]
        }
        if(this.serviceSetColor=='#f9a825'){
         this.color = this.colors[1] 
        }
        if(this.serviceSetColor=='#2e7d32'){
          this.color = this.colors[2]
        }
        if(this.serviceSetColor=='#00695c'){
          this.color = this.colors[3]
        }
        if(this.serviceSetColor=='#283593'){
          this.color = this.colors[4]
        }
        if(this.serviceSetColor=='#d81b60'){
            this.color = this.colors[5]
        }


        if(this.serviceSetColor=='#f4511e'){
            this.color = this.colors[6]
        }
        if(this.serviceSetColor=='#6d4c41'){
            this.color = this.colors[7]
        }
        if(this.serviceSetColor=='#424242'){
            this.color = this.colors[8]
        }
        if(this.serviceSetColor=='#8e24aa'){
            this.color = this.colors[9]
        }
  }  
  ngOnDestroy(){
    this.dataSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }
  ngOnInit(): void {
  	 this.routerSubscription =this.route.paramMap.subscribe((params)=>{
  		this.idMenu = params.get('id');
  		 this.dataSubscription= this.menu.viewMenu(this.idMenu).subscribe((data)=>{
  			console.log(data);
        this.headers = data.data.headers;
        this.data = data.data.menus;  		
        this.serviceSetName = data.data.service_set_name;
        this.serviceSetDescription =  data.data.service_description;
        this.serviceSetColor = data.data.color;
        this.checkSecondaryColor();
      })
  		
  	})
  }

   serviceNameChange = ()=>{
   this.isServiceSetNameError = false;
 }

 serviceDescChange = ()=>{
   this.isServiceSetDescError = false;
 }

  deleteItem = (id:string)=>{
    this.data = this.data.filter((item:any)=>{
      return item.id != id;
    })
  }


  deleteHeader =(id:string, name:string)=>{

    
    this.headers =  this.headers.filter((item:any)=>{
      return item.id != id;
    })


    for(let key of this.data){
      delete key[name]
    }


  }


  addHeader =  ()=>{
    this.headers.push({
      id:uuidv4(),
      name:''
    });


  }

  addItem =()=>{
      // for(let key in)
      // const unique = [...new Set(this.data.map( (item:any) => item.service_name))]
     this.data.push({service_name:'', category:'', description:'', id:uuidv4()})


  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.data, event.previousIndex, event.currentIndex);
    console.log(this.data);
  }

  openDialog(id:string, value:string) {
    const dialogRef = this.dialog.open(ModalComponent,{
      data:{id,value},
    height: '350px',
    width: '600px',
  });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      if(result.id){
        let objIndex = this.data.findIndex((obj:any )=> obj.id == result.id);
      this.data[objIndex].description = result.value;  
      }
      

    });
  }


  removePropertyNotInHeaders = ()=>{
  for(let value of this.data){
     
        for(let p in value){
           let flag = false;
           let name= p;     
           for(let key of this.headers){         
             if(p == key.name){
               flag = true;             
             }
           }  
             if(flag == false){
                console.log(name)
                if (name == 'id')
                  continue
                delete value[name];
            }

        }
              
    }
}

deleteHeadersThatEmpty(){
    this.headers = this.headers.filter((item:any)=>{
      return item.name != ''
    });
}


checkRequiredValues = ()=>{
  if(this.serviceSetName==''){
      this.isServiceSetNameError = true;
    }

    if(this.serviceSetDescription==''){
      this.isServiceSetDescError = true;
    }
}


   openResultDialog(){
    const dialogRef = this.dialog.open(UpdateDialogComponent);
    // dialogRef.afterClosed().subscribe((resu))
  }


  save = () =>{

    // remove property that are not in headers
    this.removePropertyNotInHeaders();

    // delete header that are empty
    this.deleteHeadersThatEmpty();

    this.wholeObject = {
      _id: this.idMenu,
      service_set_name:this.serviceSetName,
      service_set_description:this.serviceSetDescription,
      service_set_color:this.serviceSetColor,
      menus:this.data,
      headers:this.headers
    }

    // check required values
    this.checkRequiredValues();
    if(this.serviceSetDescription != '' && this.serviceSetDescription != null
      && this.serviceSetName != '' && this.serviceSetName != null
     ){
      this.menu.editMenu(this.wholeObject).subscribe((data)=>{
      console.log(data);
      
      if(data.message.errors){
        console.log('error')
      }else{
        this.openResultDialog();  
      }
    },err=>alert('Internet connection not available'))   
    }
   

    
  }

}
