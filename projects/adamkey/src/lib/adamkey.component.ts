import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { timer } from 'rxjs';

const BAR_HEIGHT = 9;
const DETAILS_HEIGHT = 75;

@Component({
  selector: 'budgetkey-chart-adamkey',
  templateUrl: './adamkey.component.html',
  styleUrls: ['./adamkey.component.less']
})
export class AdamKeyChartComponent {

  @Input() public data: any;
  @ViewChild('details', { read: ElementRef }) public details: ElementRef;
  @ViewChild('bars', { read: ElementRef }) public bars: ElementRef;

  maxValue: number = 1;
  maxHeight: number = 1;
  hoverIndex_: number = 0;

  constructor() {
  }

  public set hoverIndex( v: number) {
    // console.log('hoverIndex', v);
    this.hoverIndex_ = v;
  }

  public get hoverIndex(): number {
    return this.hoverIndex_;
  }

  scrollDetails() {
    let relOffset = this.bars.nativeElement.querySelectorAll('.bar')[this.hoverIndex].offsetTop -
                    this.bars.nativeElement.scrollTop;
    // console.log(relOffset);
    this.details.nativeElement.scrollTop = 
      this.hoverIndex * DETAILS_HEIGHT*(1 + 1/this.data.values.length) + 9 - relOffset;
  }

  scrollBars() {
    let relOffset = this.details.nativeElement.querySelectorAll('.detail')[this.hoverIndex].offsetTop -
                    this.details.nativeElement.scrollTop;
    // console.log(relOffset);
    let elementTop = this.hoverIndex * BAR_HEIGHT;
    if ((this.bars.nativeElement.scrollTop + 50> elementTop) || 
        (this.bars.nativeElement.scrollTop + 450 < elementTop)) {
      this.bars.nativeElement.scrollTop = elementTop  - relOffset - (DETAILS_HEIGHT - BAR_HEIGHT)/2;
    }
  }

  ngOnInit() {
    for (let v of this.data.values) {
      if (v.amount > this.maxValue) {
        this.maxValue = v.amount;
      }
    }
    this.maxValue *= 1.15;
    this.maxHeight = 500;
    if (this.data.selected) {
      this.hoverIndex = this.data.selected;
      timer(0).subscribe(() => this.scrollDetails());
    }
  }

}
