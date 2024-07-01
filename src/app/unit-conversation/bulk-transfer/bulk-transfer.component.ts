import { Component, OnInit } from '@angular/core';
  import { InteractionCategoryService } from '@core/services/interactionCategory.service';
  import { ToastrService } from 'ngx-toastr';
  import { ProblemService } from 'src/app/problem/problem.service';
  import { UserService } from 'src/app/user/user.service';
  import * as XLSX from 'xlsx';
@Component({
  selector: 'app-bulk-transfer',
  templateUrl: './bulk-transfer.component.html',
  styleUrls: ['./bulk-transfer.component.scss']
})
export class BulkTransferComponent implements OnInit {
    public addedFile: any[] = [];
    public uploadedList: any[] = [];
    uploadedFileName: string = '';
    tabIndex = 0;
    isLoading: boolean = false;
    previewFile: boolean = false;
    WithResolutionComment: boolean = false;
    WithCategoryAndSubCategory: boolean = false;
    WithProblemId: boolean = false;
  
    bulkCloserHistoryList: any = [];
    // displayedColumns: string[] = ['interactionid', 'comments', 'Disposition', 'SubDisposition', 'ProblemID', 'ResolveByUser', 'Team'];
    displayedColumns: string[] = ['interactionid', 'comments', 'Disposition', 'SubDisposition', 'user', 'Team'];

    constructor(
      private interactionCategoryService: InteractionCategoryService,
      private toastrService: ToastrService,
      private userService: UserService,
      private problemService: ProblemService,
  
    ) { }
  
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
        this.isLoading = true
        const formData = new FormData();
        this.addedFile.forEach(e => {
          formData.append('file', e, e.name);
        })
        let data = {
          WithResolutionComment: this.WithResolutionComment,
          WithCategoryAndSubCategory: this.WithCategoryAndSubCategory,
          WithProblemId: this.WithCategoryAndSubCategory
        }
  
        if (this.checkStatus()) {
          this.interactionCategoryService.bulkTransferUpload(data, formData).subscribe(res => {
            this.toastrService.success('File upload successfully');
            this.resetFiles();
            this.isLoading = false;
          }, error => {
            this.isLoading = false;
            this.toastrService.error(error);
          })
        } else {
          this.isLoading = false;
          this.toastrService.error('please enter valid data in file')
        }
      } else {
        this.isLoading = false;
        this.toastrService.error('Please select file to upload')
      }
  
    }
    checkStatus(): boolean {
      let value = true
      if (this.WithProblemId) {
        value = this.uploadedList.every(item => item.ProblemID)
      }
      if (this.WithResolutionComment) {
        value = this.uploadedList.every(item => item.ResolutionComments)
      }
      if (this.WithCategoryAndSubCategory) {
        value = this.uploadedList.every(item => item.Disposition && item.SubDisposition)
      }
  
      return value
    }
  
  
    resetFiles() {
      this.uploadedList = [];
      this.addedFile = [];
      this.previewFile = false
    }
  
  
    // getInteractionBulkHistory() {
    //   this.interactionCategoryService.getBulkCloserHistory().subscribe((res: any) => {
    //     this.bulkCloserHistoryList = res
    //   }, error => {
    //     this.toastrService.error(error);
    //   })
    // }
  
  
    previewUploadedFile() {
      if (this.addedFile.length) {
        this.previewFile = true;
      } else {
        this.toastrService.error('Please select file first')
      }
    }
  
  
    downloadUserList() {
      this.isLoading = true
      this.userService.getUsersForDownload().subscribe((res: any) => {
        let usersRecods: any = res?.body;
        let heading = [[
          // 'First Name',
          // 'Last Name',
          // 'Email',
          // 'Mobile',
          // 'ROLE',
          // 'IsActive',
          'Login Name',
          'Name',
          'Email',
          'Team'
        ]];
  
        let usersReport = [];
        usersRecods.forEach(data => {
          usersReport.push({
            'Login Name': data?.tLoginName,
            'Name': data?.fullName,
            'Email': data?.tEmail,
            // 'Mobile': data?.phoneNumber,
            'Team': data?.team,
       
          })
        });
        let workBook = XLSX.utils.book_new();
        XLSX.utils.sheet_add_aoa(workBook, heading);
        let workSheet = XLSX.utils.sheet_add_json(workBook, usersReport, { origin: "A2", skipHeader: true });
        XLSX.utils.book_append_sheet(workBook, workSheet, 'Users Report');
        XLSX.writeFile(workBook, 'Users Report' + ".xlsx");
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
      })
  
    }
    downloadProblemId() {
      this.isLoading = true
      this.problemService.getProblemList().subscribe(res => {
        let problemList = res;
    let heading = [[
          'Problem Id',
          'Problem Name',
          'IsActive',
        ]];
  
        let problemReport = [];
        problemList.forEach(data => {
          problemReport.push({
            'Problem Id': data?.problemId,
            'Problem Name': data?.problemName,
          })
        });
        let workBook = XLSX.utils.book_new();
        XLSX.utils.sheet_add_aoa(workBook, heading);
        let workSheet = XLSX.utils.sheet_add_json(workBook, problemReport, { origin: "A2", skipHeader: true });
        XLSX.utils.book_append_sheet(workBook, workSheet, 'Users Report');
        XLSX.writeFile(workBook, 'Problem Report' + ".xlsx");
        this.isLoading = false
      },error=>{
        this.isLoading = false
      })
  
  
  
  
    }
  }
  
