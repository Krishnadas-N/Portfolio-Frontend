import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-works',
  standalone: true,
  imports: [],
  templateUrl: './works.component.html',
  styleUrl: './works.component.scss'
})
export class WorksComponent {
  someSubscription: any;
    constructor(private router:Router){
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };
      this.someSubscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // Here is the dashing line comes in the picture.
          // You need to tell the router that, you didn't visit or load the page previously, so mark the navigated flag to false as below.
          this.router.navigated = false;
        }
      });
    }
    ngOnDestroy() {
      if (this.someSubscription) {
        this.someSubscription.unsubscribe();
      }
    }

}
