import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnInit
} from '@angular/core';
import { Chart, ChartPoint } from 'chart.js';
import { DynamicScriptLoaderService } from '../services/dynamicLoader.service';
import { DataService } from '../services/data.service';
import { BROADCAST_DATA_TYPE } from '../lib/types/data.types';

@Component({
  selector: 'app-valentine',
  templateUrl: './valentine.component.html',
  styleUrls: ['./valentine.component.scss']
})
export class ValentineComponent implements AfterViewInit, OnInit {
  private readonly axisUnit = 83.33;
  private readonly border = 300;

  @ViewChild('scatter') scatterCanvas: ElementRef;
  @ViewChild('scatter2') scatterCanvasTwo: ElementRef;
  @ViewChild('bgm') BGM: ElementRef;
  public scatterChart: Chart;
  public scatterChartTwo: Chart;

  public textContent: string[] = [
    '很高兴遇见你',
    '那个习惯一个人的你',
    '却不喜欢一个人的你',
    '我想追上你',
    '那个不太爱说心事的你',
    '我想成为你生命你的那道光',
    '能带你看到不一样的世界',
    '因为。。。',
    '',
    '我喜欢你'
  ];

  constructor(private dynamicLoader: DynamicScriptLoaderService, private dataService: DataService) {
    this.range = {
      min: -2,
      max: 2
    };
    this.chartData = [];

    this.chartOptions = {
      legend: {
        display: false
      },
      scales: {
        display: false,
        xAxes: [
          {
            ticks: {
              display: false
            },
            gridLines: {
              drawBorder: false,
              display: false
            }
          }
        ],
        yAxes: [
          {
            ticks: {
              display: false
            },
            gridLines: {
              drawBorder: false,
              display: false
            }
          }
        ]
      }
    };
  }

  public chartData: ChartPoint[];
  public complex: 5;
  public range: {
    min: number;
    max: number;
  };

  private chartOptions: Chart.ChartOptions;
  private enableMove = false;

  private heartAbove(x: number) {
    return Math.sqrt(2 * Math.abs(x) - x * x);
  }

  private heartBelow(x: number) {
    return -2.14 * Math.sqrt(Math.SQRT2 - Math.sqrt(Math.abs(x)));
  }

  private getHeartWaves(dots: number, offset: number = 0) {
    const range = this.range.max - this.range.min;
    const unit = parseFloat((range / (dots + 1)).toPrecision(2));
    const results: ChartPoint[] = [];
    for (let i = 1; i <= dots; i++) {
      const x = this.range.min + parseFloat((unit * i).toPrecision(2));
      results.push({
        x: x + offset,
        y: i % 2 === 0 ? this.heartBelow(x) : this.heartAbove(x)
      });
    }

    return results;
  }

  async ngOnInit() {
    this.dataService.sendMessage<boolean>({
      type: BROADCAST_DATA_TYPE.HIDE_NAV,
      payload: true
    });

    await this.dynamicLoader
      .load('flower', 'bloom')
      .catch(error => console.log(error));
  }

  ngAfterViewInit() {
    (this.BGM.nativeElement as HTMLAudioElement).volume = 0.15;

    let complex = 1;
    this.scatterChart = new Chart(this.scatterCanvas.nativeElement, {
      type: 'scatter',
      data: {
        datasets: [
          {
            borderWidth: 5,
            showLine: true,
            borderColor: 'rgba(255, 0, 0, 1)',
            fill: false,
            data: []
          }
        ]
      },
      options: this.chartOptions
    });
    this.scatterChartTwo = new Chart(this.scatterCanvasTwo.nativeElement, {
      type: 'scatter',
      data: {
        datasets: [
          {
            borderWidth: 5,
            showLine: true,
            borderColor: 'rgba(255, 0, 0, 1)',
            fill: false,
            data: []
          }
        ]
      },
      options: this.chartOptions
    });

    const interval = setInterval(() => {
      if (complex < 100) {
        this.scatterChart.data.datasets[0].data = this.getHeartWaves(complex++);
        this.scatterChart.update();
      } else {
        this.enableMove = true;
        this.scatterChartTwo.data.datasets[0].data = this.getHeartWaves(
          complex++ - 100
        );
        this.scatterChartTwo.update();
      }

      if (this.scatterChartTwo.data.datasets[0].data.length >= 100) {
        clearInterval(interval);
      }
    }, 250);

    (this.scatterCanvas.nativeElement as HTMLCanvasElement).className +=
      ' fadeIn';
    setTimeout(() => {
      (this.scatterCanvas.nativeElement as HTMLCanvasElement).className +=
        ' fadeOut';
      (this.scatterCanvasTwo.nativeElement as HTMLCanvasElement).className +=
        ' fadeOut';
    }, 50000);
    setTimeout(() => {
      (this.scatterCanvasTwo.nativeElement as HTMLCanvasElement).className +=
        ' fadeIn';
    }, 25000);
  }
}
