import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-interaction-detail-view-dialog',
  templateUrl: './interaction-detail-view-dialog.component.html',
  styleUrls: ['./interaction-detail-view-dialog.component.scss']
})
export class InteractionDetailViewDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<InteractionDetailViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data,
  ) { 
    
  }

  ngOnInit(): void {
  }

}
