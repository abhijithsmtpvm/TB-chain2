import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [
    "../node_modules/angular2-busy/build/style/busy.css",
    "styles.css"
  ]
})
export class AppComponent {
  title = 'VaccBlock Vaccination at a Block Level';
  constructor(private routerModule: RouterModule){}

}
