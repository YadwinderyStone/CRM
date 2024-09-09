import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import { ToastrService } from 'ngx-toastr';
import { Problem } from '../problem.model';
import { ProblemService } from '../problem.service';
import { AddEditProblemDialogComponent } from '../add-edit-problem-dialog/add-edit-problem-dialog.component';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ProblemComponent extends BaseComponent implements OnInit {

  problemList: Problem[] = [];
  columnsToDisplay: string[] = ['id', 'name', 'status', 'action',];
  isLoading: Boolean = false
  constructor(private dialog: MatDialog,
    private commonDialogService: CommonDialogService,
    private problemService: ProblemService,
    private toastrService: ToastrService,
    public translationService: TranslationService,
  ) {
    super(translationService);
    this.getLangDir();
  }


  ngOnInit(): void {
    this.getProblemList();
    // this.problemList = []
  }

  getProblemList(): void {
    this.isLoading = true
    this.problemService.getProblemList().subscribe(res => {
      this.problemList = res;
      this.isLoading = false
    }, error => {
      this.isLoading = false

    })
  }


  deleteProblem(data: Problem): void {
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(`${this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_DELETE')}`)
      .subscribe(isTrue => {
        if (isTrue) {
          this.deleteProblemById(data.id);
        }
      });
  }

  deleteProblemById(id) {
    this.problemService.deleteProblemById(id).subscribe(d => {
      this.toastrService.success('Status deleted sucessfully');
      this.getProblemList()
    }, error => {
      this.toastrService.error(error);
    });
  }


  manageStatus(data: Problem): void {
    const dialogRef = this.dialog.open(AddEditProblemDialogComponent, {
      width: '550px',
      direction: this.langDir,
      data: Object.assign({}, data)
    });

    this.sub$.sink = dialogRef.afterClosed()
      .subscribe((result: Problem) => {
        if (result) {
          this.getProblemList()
        }
      });
  }

  downloadExcel() {
    if (this.problemList.length == 0) {
      return
    }
    this.isLoading = true;
    let InteractionRecods: any = this.problemList;
    let heading = [[
        'Problem Id', 
      'Name', 
      'Status'
    ]];

    let interactionsReport = [];
    InteractionRecods.forEach(data => {
      interactionsReport.push({
        'Problem Id': data?.problemId,
        'Name': data?.problemName,
        'Status': data?.isEnabled?'Active':'In Active',
      })
    });
    let workBook = XLSX.utils.book_new();
    XLSX.utils.sheet_add_aoa(workBook, heading);
    let workSheet = XLSX.utils.sheet_add_json(workBook, interactionsReport, { origin: "A2", skipHeader: true });
    XLSX.utils.book_append_sheet(workBook, workSheet, 'ProblemIdList');
    XLSX.writeFile(workBook, 'ProblemIdList' + ".xlsx");
    this.isLoading = false;
  }

}
