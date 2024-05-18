import { Component, OnInit } from '@angular/core';
import { BestSellingProudct } from '@core/domain-classes/bast-selling-product';
import { Months } from '@core/domain-classes/months';
import { TranslationService } from '@core/services/translation.service';
import { ChartOptions, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { DashboardService } from '../dashboard.service';

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

  pieChartLabels: string[] = ['Status', 'Category', 'Team'];
  pieChartData: number[] = [150, 200, 100 ];


  constructor(private dashboardService: DashboardService,
    public translationService: TranslationService) { }

  ngOnInit() {
    // this.isLoading = true;
    for (let index = 1995; index < 2050; index++) {
      this.years.push(index);
    }
    this.getChartsData();
    
  }

  getChartsData() {
    this.dashboardService.getBestSellingProducts(this.selectedMonth, this.selectedYear).subscribe((data: BestSellingProudct[]) => {
      const salesCount = data.map(c => c.count);
      this.barChartData = [
        { data: salesCount, label: this.translationService.getValue('SALES') }
      ];
      this.barChartLabels = data.map(c => c.name);
    });
  }
}

