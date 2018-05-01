import { Component } from '@angular/core';

let country_gdp = require('./adamke.json')

@Component({
  selector: 'my-app',
  template: `
    <div id="adamkey-container">
        <budgetkey-chart-adamkey [data]="data"></budgetkey-chart-adamkey>
    </div>
 `,
  styles: [

  ]
})
export class AppComponent {

  private data: any = {
    values: country_gdp
  };

  constructor() {
  }

}
