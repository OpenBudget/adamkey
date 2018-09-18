import { Component, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'budgetkey-chart-adamkey',
  template: `
    <div class='chart'>
      <div class='details-container'>
        <div class="details" #details
             [style.height]="maxHeight + 'px'"
        >
          <div class='detail' 
              *ngFor='let value of data.values; let i = index'
              [ngClass]="{hovered: i == hoverIndex && hoverIndex != data.selected, selected: i == data.selected}"
              (mouseover)="hoverIndex = i; scrollBars()"
          >
            <div class='index-col'>
              <div class='text'>{{ i + 1 }}</div>
            </div>
            <div class='label-col'>
              <div class='text' [innerHtml]="value.label"></div>
            </div>
            <div class='amount-col'>
              <div class='text'>{{ value.amount_fmt }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class='barchart' #bars
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
        display: flex;
        flex-flow: row;
      }

      .text {
        vertical-align: middle;
        // height: 0px;
        display: inline-block;    
      }

      .details-container {
        padding: 0px 20px;
      }

      .details, .barchart {
        scroll-behavior: smooth;
        flex: 1;
      }

      .details {
        overflow-y: scroll;
        border: 1px solid #EEEEEE;	
        border-radius: 4px;	
        background-color: #FFFFFF;
        box-shadow: 0 2px 10px 0 rgba(0,0,0,0.1);
        padding: 10px 20px;
      }

      @media only screen and (max-width: 600px) {
        .details {
          box-shadow: none;
          border: none;
          padding: 0;
        }
      }

      .detail {
        height: 50px;
        display: flex;
        flex-flow: row;
        align-items: center;
        vertical-align: middle;
      }

      .detail.hovered {
        background-color: #E9E6F1;
      }

      .index-col {
        opacity: 0.8;	
        color: #C3C3C3;	
        font-family: "Abraham TRIAL";	
        font-size: 18px;	
        text-align: right;
        padding-right: 15px;
        width: 40px;
      }

      .amount-col {
        margin-right: auto;
        margin-left: 0;
        // text-align: left;
        color: #3E4E59;	
        font-family: "Miriam Libre";	
        font-size: 14px;
        font-weight: 400;
      }

      .detail.selected {
        background-color: #FE8255;
      }

      .detail.selected .text, ::ng-deep .detail.selected .text a {
        color: #FFFFFF !important;
      }

      .barchart {
        position: relative;
        border-right: 1px solid #888;
        padding-right: 0;
        overflow-y: scroll;
      }   

      @media only screen and (max-width: 600px) {
        .barchart {
          display: none;
        }
      }

      .bar {
        position: absolute;
        height: 8px;
        background-color: #E9E6F1;
      }

      .bar.hovered {
        background-color: #5A32D1;
      }

      .bar.selected {
        background-color: #FE8255;
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
  @ViewChild('bars', { read: ElementRef }) public bars: ElementRef;

  maxValue: number = 1;
  maxHeight: number = 1;
  hoverIndex_: number = 0;

  BAR_HEIGHT = 9;
  DETAILS_HEIGHT = 50;

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
    let relOffset = this.bars.nativeElement.querySelectorAll('.bar')[this.hoverIndex].offsetTop -
                    this.bars.nativeElement.scrollTop;
    console.log(relOffset);
    this.details.nativeElement.scrollTop = 
      this.hoverIndex * this.DETAILS_HEIGHT*(1 + 1/this.data.values.length) + 9 - relOffset;
  }

  scrollBars() {
    let relOffset = this.details.nativeElement.querySelectorAll('.detail')[this.hoverIndex].offsetTop -
                    this.details.nativeElement.scrollTop;
    console.log(relOffset);
    let elementTop = this.hoverIndex * this.BAR_HEIGHT;
    if ((this.bars.nativeElement.scrollTop + 50> elementTop) || 
        (this.bars.nativeElement.scrollTop + 450 < elementTop)) {
      this.bars.nativeElement.scrollTop = elementTop  - relOffset - (this.DETAILS_HEIGHT - this.BAR_HEIGHT)/2;
    }
  }

  ngOnInit() {
    for (let v of this.data.values) {
      if (v.amount > this.maxValue) {
        this.maxValue = v.amount;
      }
    }
    this.maxValue *= 1.15;
    // this.maxHeight = this.data.values.length * 9;
    // if (this.maxHeight < 200) {
    //   this.maxHeight = 200;
    // }
    this.maxHeight = 500;
    if (this.data.selected) {
      this.hoverIndex = this.data.selected;
      window.setTimeout(() => this.scrollDetails(), 0);
    }
  }

}
