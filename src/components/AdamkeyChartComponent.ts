import { Component, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'budgetkey-chart-adamkey',
  template: `
    <div class='row chart'>
      <div class='details-container col-md-6'>
        <div class="details" #details
             [style.height]="maxHeight + 'px'"
        >
          <div class='row detail' 
              *ngFor='let value of data.values; let i = index'
              [ngClass]="{hovered: i == hoverIndex && hoverIndex != data.selected, selected: i == data.selected}"
              (mouseover)="hoverIndex = i"
          >
            <div class='index-col col-xs-1'>
              <div class='text'>{{ i + 1 }}</div>
            </div>
            <div class='label-col col-xs-7'>
              <div class='text' [innerHtml]="value.label"></div>
            </div>
            <div class='amount-col col-xs-4'>
              <div class='text'>{{ value.amount_fmt }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class='barchart col-md-6'
        [style.height]="maxHeight + 'px'"
        >
        <ng-container  *ngFor="let v of data.values; let i = index">
          <div class="bar-bg"
              [ngClass]="{hovered: i == hoverIndex && hoverIndex != data.selected, selected: i == data.selected}"
              [style.top]="(9 * i) + 'px'"
              (mouseover)="hoverIndex = i; scrollDetails()"
              >
          </div>
          <div class="bar"
              [ngClass]="{hovered: i == hoverIndex && hoverIndex != data.selected, selected: i == data.selected}"
              [style.width]="100 * (v.amount / maxValue) + '%'"
              [style.top]="(9 * i) + 'px'"
              (mouseover)="hoverIndex = i; scrollDetails()"
              >
          </div>
        </ng-container>
    </div>
  `,
  styles: [
    `
      .chart {
        margin-top: 20px;
      }

      .text {
        vertical-align: middle;
        height: 0px;
        display: inline-block;    
      }

      .details-container {
        padding: 0px 20px;
      }

      .details {
        overflow-y: scroll;
        scroll-behavior: smooth;
        border: 1px solid #EEEEEE;	
        border-radius: 4px;	
        background-color: #FFFFFF;
        box-shadow: 0 2px 10px 0 rgba(0,0,0,0.1);
        padding: 10px 20px;
      }

      .detail {
        height: 50px;
      }

      .detail.hovered {
        background-color: #EAF9DE;
      }

      .index-col {
        opacity: 0.8;	
        color: #C3C3C3;	
        font-family: "Abraham TRIAL";	
        font-size: 18px;	
        text-align: right;
      }

      ::ng-deep .label-col a {
        color: #7FAA5E;	
        font-family: "Abraham TRIAL";	
        font-size: 14px;
        text-align: right; 
      }

      .amount-col {
        text-align: left;
        color: #3E4E59;	
        font-family: "Miriam Libre";	
        font-size: 14px;
        font-weight: 400;
      }

      .detail.selected {
        background-color: #6A9548;
      }

      .detail.selected .text, ::ng-deep .detail.selected .text a {
        color: #FFFFFF !important;
      }

      .barchart {
        position: relative;
        border-right: 1px solid #888;
        padding-right: 0;
      }   

      .bar {
        position: absolute;
        height: 8px;
        background-color: #EAF9DE;
      }

      .bar.hovered {
        background-color: #C5F6A2;
      }

      .bar.selected {
        background-color: #6A9548;
      }
      
      .bar-bg {
        position: absolute;
        width: 100%;
        height: 8px;
        opacity: 0.01
        background-color: #fff;
      }

      .bar-bg.hovered {
        background-color: #eee;
      }
      
      .bar-bg.selected {
        background-color: #ccc;
      }
    `
  ]
})
export class AdamKeyChartComponent {

  @Input() public data: any;
  @ViewChild('details', { read: ElementRef }) public details: ElementRef;

  maxValue: number = 1;
  maxHeight: number = 1;
  hoverIndex_: number = 0;

  constructor() {
  }

  public set hoverIndex( v: number) {
    console.log('hoverIndex', v);
    this.hoverIndex_ = v;
  }

  public get hoverIndex(): number {
    return this.hoverIndex_;
  }

  scrollDetails() {
    this.details.nativeElement.scrollTop = // height of detail - height of bar
      10 + this.hoverIndex * (50*(1 + 1/this.data.values.length) - 9); 
    console.log('st', this.details.nativeElement.scrollTop);
  }

  ngOnInit() {
    for (let v of this.data.values) {
      if (v.amount > this.maxValue) {
        this.maxValue = v.amount;
      }
    }
    this.maxValue *= 1.15;
    this.maxHeight = this.data.values.length * 9;
    if (this.maxHeight < 200) {
      this.maxHeight = 200;
    }
    if (this.data.selected) {
      this.hoverIndex = this.data.selected;
      window.setTimeout(() => this.scrollDetails(), 0);
    }
  }

}
