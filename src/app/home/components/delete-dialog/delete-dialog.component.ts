import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  constructor(
   	  public dialogRef: MatDialogRef<DeleteDialogComponent>) {}


  ngOnInit(): void {
  }


  // decision:boolean = false;

  closeDialog(value:boolean) {
    this.dialogRef.close(value);
  }

}
