// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent {
//   title = 'nostandaloneangular';
// }

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<app-menu></app-menu>
             <router-outlet></router-outlet>`
})
export class AppComponent { }
