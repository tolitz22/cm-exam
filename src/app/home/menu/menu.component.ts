import { Component, OnInit,ViewChild } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { v4 as uuidv4 } from 'uuid';
import {ModalComponent} from '../components/modal/modal.component';
import {ResultModalComponent} from '../components/result-modal/result-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {MenuService} from 'src/app/core/services/menu.service';
import {MatMenuTrigger} from '@angular/material/menu';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  constructor(public dialog: MatDialog, private menu:MenuService) {}

    @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger | any;

	  headerNames:any = [];
    data:any =  [];

    serviceSetName:string ='';
    serviceSetDescription = '';
    serviceSetColor:string = '#424242';
      
    wholeObject:any;

    isServiceSetNameError:boolean = false;
    isServiceSetDescError:boolean = false;
    color="#eeeeee"
    colors:any[]= ['#ffebee', '#fffde7','#e8f5e9','#e8f5e9', '#e8eaf6','#fce4ec','#fff3e0','#efebe9',
    '#f5f5f5','#f3e5f5'
    ]  ;



  headers:any= [
     {
        id:uuidv4(),
        name:'service_name'
      },
      {
        id:uuidv4(),
        name:'description'
      },
      {
        id:uuidv4(),
        name:'category'
      },
      {
        id:uuidv4(),
        name:'price'
      }  
  ];



 // hoverMenu(){
 //   this.trigger.openMenu();
 // } 

 // closeMenu(){
 //   this.trigger.closeMenu();
 //   // alert('zz')
 // }

  chooseColor(primary:string, secondary:string){
      this.color = secondary;
      this.serviceSetColor = primary;
  } 

 serviceNameChange = ()=>{
   this.isServiceSetNameError = false;
 }

 serviceDescChange = ()=>{
   this.isServiceSetDescError = false;
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

  save = () =>{

    // remove property that are not in headers
    this.removePropertyNotInHeaders();

    // delete header that are empty
    this.deleteHeadersThatEmpty();

    this.wholeObject = {
      service_set_name:this.serviceSetName,
      service_set_description:this.serviceSetDescription,
      service_set_color:this.serviceSetColor,
      menus:this.data,
      headers:this.headers
    }

    // check required values
    this.checkRequiredValues();

    this.menu.createMenu(this.wholeObject).subscribe((data)=>{
      console.log(data);
      
      if(data.message.errors){
        console.log('error')
      }else{
        this.openResultDialog();  
        this.headers = [ {id:uuidv4(),name:'service_name'},{id:uuidv4(),name:'description'},{id:uuidv4(),name:'category'},{id:uuidv4(),name:'price'} ];
        this.data= [{service_name:'', category:'', description:'', id:uuidv4()}];
        this.serviceSetName = '';
        this.serviceSetDescription = '';
      }
    },err=>alert('Internet connection not available'))

    
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

  openResultDialog(){
    const dialogRef = this.dialog.open(ResultModalComponent);
    // dialogRef.afterClosed().subscribe((resu))
  }




drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.data, event.previousIndex, event.currentIndex);
    console.log(this.data);
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

  deleteItem = (id:string)=>{
    this.data = this.data.filter((item:any)=>{
      return item.id != id;
    })
  }



  ngOnInit(): void {

    this.data.push({service_name:'', category:'', description:'', id:uuidv4()})

  }

  // trackByItems(index: number, item: any): number { return item.id; }

  modelChangeHeader=(event:any) =>{
    // console.log(this.headers)
    // console.log(event);
  }

}
