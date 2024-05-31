import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';
import { UserService } from '../user.service';
import { BaseComponent } from 'src/app/base.component';

@Component({
  selector: 'app-bulk-user-upload',
  templateUrl: './bulk-user-upload.component.html',
  styleUrls: ['./bulk-user-upload.component.scss']
})
export class BulkUserUploadComponent extends BaseComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  public addedFile: any[] = [];
  public uploadedList: any[] = [];
  uploadedFileName: string = '';
  isLoading: boolean = false;
  tabIndex = 0;
  previewFile: boolean = false;
  responceData :any
  displayedColumns: string[] = ['firstName', 'lastName', 'userId', 'email', 'phoneNumber', 'role', 'MaxAssignInteraction', 'password'];
  footerToDisplayed = ['footer'];
  constructor(
    private userService: UserService,
    private toastrService: ToastrService,

  ) {
    super()
  }

  ngOnInit() {
  }

  onFileSelect(event: any) {
    let fileSelected = event.target.files[0];
    if (!fileSelected) {
      return;
    }
    this.previewFile = false;
    const fileExtension: string = fileSelected.name.split('.').pop()?.toLowerCase() || '';

    if (fileExtension === 'xls' || fileExtension === 'xlsx') {
      this.addedFile = [];
      this.addedFile.push(fileSelected);
    } else {
      this.toastrService.error('Please upload valid file type')
    }
    const target: DataTransfer = <DataTransfer>event.target;
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      this.uploadedList = XLSX.utils.sheet_to_json(ws, { header: 1 });
      this.uploadedList = this.uploadedList.slice(1).map((row: any) => {
        const obj: any = {};
        if (row[0] !== undefined) {
          this.uploadedList[0].forEach((key: string, index: number) => {
            obj[key] = row[index];
          });
        }
        return obj;
      });
      this.uploadedList = this.uploadedList.filter(obj => Object.keys(obj).length !== 0);
    };
    reader.readAsBinaryString(target.files[0]);
  }



  uploadFile() {
    if (this.addedFile.length) {
      this.isLoading = true;
      const formData = new FormData();
      this.addedFile.forEach(e => {
        formData.append('file', e, e.name);
      })
      
      this.userService.bulkUpload(formData).subscribe((res: any) => {
        if(res){
          this.responceData = res; 
          this.toastrService.success('User file upload successfully');
          this.resetFiles();
          this.isLoading = false;
        }
      }, error => {
        this.isLoading = false;
        this.toastrService.error(error);
      })
    } else {
      this.toastrService.error('Please select file to upload')
    }

  }



  resetFiles() {
    this.uploadedList = [];
    this.addedFile = [];
    this.previewFile = false;
    this.responceData = null
    this.fileInput.nativeElement.value = '';
    // window.location.reload();
  }


  previewUploadedFile() {
    if (this.addedFile.length) {
      this.previewFile = true;
    } else {
      this.toastrService.error('Please select file first')
    }
  }

}
