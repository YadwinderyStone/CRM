import { Component, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { Dispostion } from '../disposition.model';
import { DispositionService } from '../disposition.service';


@Component({
  selector: 'app-add-disposition',
  templateUrl: './add-disposition.component.html',
  styleUrls: ['./add-disposition.component.scss']
})
export class AddDispositionComponent extends BaseComponent implements OnChanges {

  isEdit: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<AddDispositionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Dispostion,
    public translationService: TranslationService,
    private dispositionService: DispositionService,
    private toastrService: ToastrService) {
    super(translationService);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      if (this.data.id) {
        this.isEdit = true;
      }
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }

  addDisposition(): void {

    if (this.data.id) {
      this.dispositionService.updateDisposition(this.data).subscribe(c => {
        this.toastrService.success('Disposition updated Successfully.');
        this.dialogRef.close(this.data);
      }, error => {
        this.toastrService.error(error);
      });
    } else {
      this.dispositionService.addDisposition(this.data).subscribe(c => {
        this.toastrService.success('Disposition Saved Successfully.');
        this.dialogRef.close(this.data);
      }, error => {
        this.toastrService.error(error);
      });
    }
  }

  checkEnable(e: any) {
    this.data.isEnabled = e.checked
  }


}

