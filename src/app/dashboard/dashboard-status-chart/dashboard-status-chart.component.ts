import { Component, OnInit } from '@angular/core';
import { BestSellingProudct } from '@core/domain-classes/bast-selling-product';
import { Months } from '@core/domain-classes/months';
import { TranslationService } from '@core/services/translation.service';
import { ChartOptions, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { DashboardService } from '../dashboard.service';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard-status-chart',
  templateUrl: './dashboard-status-chart.component.html',
  styleUrls: ['./dashboard-status-chart.component.scss']
})
export class DashboardStatusChartComponent implements OnInit {
  isLoading:boolean = false;
  months = Months;
  years = [];
  barChartLabels: Label[] = [];
  barChartData: ChartDataSets[] = [];
  selectedMonth = new Date().getMonth() + 1;
  selectedYear = new Date().getFullYear();
  statusPieChartData:any = [];
  sourcePieChartData:any = [];
  teamPieChartData:any = [];
  barChartOptions: ChartOptions = {
    responsive: true,
    elements: {
      arc: {
        borderWidth: 2
      }
    },
    plugins: {
      datalabels: {
        color: 'red', // Color of the data labels
        font: {
          weight: 'bold' // Font weight of the data labels
        },
        formatter: (value, context) => {
          // Customize the format of the data labels
          return `${value}`;
        }
      }
    }
  };

  public pieChartColors: Array < any > = [{
    backgroundColor: ['#dc3545', '#009688 ', '#ffc107','#dc3545', '#009688 '],
    hoverBackgroundColor: ['#dc3545', '#009688 ', '#ffc107','#dc3545', '#009688 '],
    // borderColor: ['#dc3545', '#009688 ', '#ffc107'],
    // hoverBorderColor: ['#dc3545', '#009688 ', '#ffc107'],
 }];

  statusChartLabels: string[] = [];
  statusChartData: number[] = [ ];
  sourceChartLabels: string[] = [];
  sourceChartData: number[] = [];
  teamChartLabels: string[] = [];
  teamChartData: number[] = [];


  constructor(private dashboardService: DashboardService,
    public translationService: TranslationService,
    public toasterService: ToastrService 
  ) { }

  ngOnInit() {
    // this.isLoading = true;
    for (let index = 1995; index < 2050; index++) {
      this.years.push(index);
    }
    // this.getChartsData();
    this.getStatusChartData();
    this.getSourceChartData();
    // this.getTeamChartData();
  }

  getChartsData() {
    // this.dashboardService.getBestSellingProducts(this.selectedMonth, this.selectedYear).subscribe((data: BestSellingProudct[]) => {
    //   const salesCount = data.map(c => c.count);
    //   this.barChartData = [
    //     { data: salesCount, label: this.translationService.getValue('SALES') }
    //   ];
    //   this.barChartLabels = data.map(c => c.name);
    // });
  }


getStatusChartData(){
  this.isLoading = true
  this.dashboardService.getStatusChartData().subscribe(res=>{
    this.statusPieChartData = res?.body;
    this.statusPieChartData.forEach((e:any) => {
      this.statusChartLabels.push(e.statusName)
      this.statusChartData.push(e.total)
    })
    this.isLoading = false
  },error=>{
      this.isLoading = false
      this.toasterService.error(error);
    });
}
getSourceChartData(){
  this.isLoading = true
  this.dashboardService.getSourceChartData().subscribe(res=>{
    this.sourcePieChartData = res?.body;
    this.sourcePieChartData.forEach(e => {
      this.sourceChartLabels.push(e.source)
      this.sourceChartData.push(e.total)
    })
    this.isLoading = false
  },error=>{
      this.isLoading = false
      this.toasterService.error(error);
    });
}
getTeamChartData(){
  this.isLoading = true
  this.dashboardService.getTeamChartData().subscribe(res=>{
    this.teamPieChartData = res?.body;
    this.teamPieChartData.forEach(e => {
      this.teamChartLabels.push(e.source)
      this.teamChartData.push(e.total)
    })
    this.isLoading = false
  },error=>{
      this.isLoading = false
      this.toasterService.error(error);
    });
}




}

