import { Component, Input, OnInit } from '@angular/core';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-interaction-last-action-taken',
  templateUrl: './interaction-last-action-taken.component.html',
  styleUrls: ['./interaction-last-action-taken.component.scss']
})
export class InteractionLastActionTakenComponent extends BaseComponent implements OnInit {
  @Input() id: string
  isLoading = false;
  actionsList: any = [];
  constructor(
    private toastrService: ToastrService,
    private InteractionServices: InventoryService,
    public translationService: TranslationService) {
    super(translationService);
    this.getLangDir();

  }

  ngOnInit(): void {
    this.getNotesList();
  }

  getNotesList() {
    this.isLoading = true;
    this.InteractionServices.getInteractionLastActions(this.id).subscribe(res => {
      this.actionsList = res
      this.isLoading = false
    }, error => {
      this.isLoading = false
      this.toastrService.error(error)
    })
  }
}

