import { Component } from '@angular/core';

const country_gdp = require('./adamke.json');

@Component({
  selector: 'app-root',
  template: `
    <div id="adamkey-container">
        <budgetkey-chart-adamkey [data]="data"></budgetkey-chart-adamkey>
    </div>
 `,
  styles: [

  ]
})
export class AppComponent {

  public data: any = {
    values: country_gdp,
    selected: (() => {
      for (let i = 0 ; i < country_gdp.length ; i++) {
        if (country_gdp[i].label === 'Israel') {
          return i;
        }
      }
    })()
  };

  constructor() {
  }

}
