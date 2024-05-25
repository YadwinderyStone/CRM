import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-interaction-attachments-list',
  templateUrl: './interaction-attachments-list.component.html',
  styleUrls: ['./interaction-attachments-list.component.scss']
})
export class InteractionAttachmentsListComponent implements OnChanges {

  @Input() id:any;
  documentList:any=[];
  emailDocumentList:any=[];
  isLoading = false
  columnsToDisplay: string[] = ['transactionNo','fileName','fileType','createdByName','date' ];
  columnsToDisplay2: string[] = ['transactionNo','fileName','fileType','createdByName' ];
    constructor(
      private inventoryService: InventoryService,
      private toastrService: ToastrService,
    ) { }
  
    ngOnChanges(): void {
  if(this.id)this.getDocumentDetail(this.id);
  if(this.id)this.getEmailDocumentDetail(this.id);
    }
  
    getDocumentDetail(id){
      this.isLoading = true
      this.inventoryService.getDocumentDetail(id).subscribe((res:any)=>{
        this.documentList = res?.body || res
        this.isLoading = false
      },error=>{
        this.isLoading = false
        this.toastrService.error(error);
      })
    }
    getEmailDocumentDetail(id){
      this.isLoading = true
      this.inventoryService.getEmailDocumentDetail(id).subscribe((res:any)=>{
        this.emailDocumentList = res?.body || res
        this.isLoading = false
      },error=>{
        this.isLoading = false
        this.toastrService.error(error);
      })
    }
    downloadFile(doc){
      this.isLoading = true

      this.inventoryService.downloadDocument(doc?.id).subscribe(res => {
        const url = window.URL.createObjectURL(res);
        const a = document.createElement('a');
        a.href = url;
        a.download = doc?.attchmntFileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        this.isLoading = false
      },error=>{
        this.isLoading = false
        this.toastrService.error(error);
      })
      
    }
  
    downloadEmailFile(data){
      // const url = window.URL.createObjectURL(data?.attchmntFileData);
      // const a = document.createElement('a');
      // a.href = url;
      // a.download = data?.attchmntFileName;
      // document.body.appendChild(a);
      // a.click();
      // document.body.removeChild(a);
      // window.URL.revokeObjectURL(url);
      // this.isLoading = false
debugger
      const url = URL.createObjectURL(data?.attchmntFileData);
      const a = document.createElement('a');
      a.href = url;
      a.download = data?.attchmntFileName;
      document.body.appendChild(a);  
      a.click();
      document.body.removeChild(a);  
      URL.revokeObjectURL(url);
    }


  }
  