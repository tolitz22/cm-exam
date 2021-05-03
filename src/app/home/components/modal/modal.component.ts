import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

   constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
   	  public dialogRef: MatDialogRef<ModalComponent>) {}

   description:string ='';

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close(this.data);
  }

}
