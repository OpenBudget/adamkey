import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  public data: any = {};

  constructor(private http: HttpClient) {
    http.get('assets/adamke.json').subscribe((country_gdp: any) => {
      this.data = {
        values: country_gdp,
        selected: (() => {
          for (let i = 0 ; i < country_gdp.length ; i++) {
            if (country_gdp[i].label === 'Israel') {
              return i;
            }
          }
          return 0;
        })()
      };
    });
  }

}
