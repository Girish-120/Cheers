import { isPlatformBrowser } from '@angular/common';
import { transition, trigger, query, style, animate } from '@angular/animations';
import { AppserviceService } from "../app/appservice.service";
import { ChangeDetectorRef, Component, Inject, PLATFORM_ID } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, Event as RouterEvent } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('myAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [style({ opacity: 0 })],
          { optional: true }
        ),
        query(
          ':leave',
          [style({ opacity: 1 }), animate('0.4s', style({ opacity: 0 }))],
          { optional: true }
        ),
        query(
          ':enter',
          [style({ opacity: 0 }), animate('0.4s', style({ opacity: 1 }))],
          { optional: true }
        )
      ])
    ])
  ]
})
export class AppComponent {
  title = 'cheers';

  display: boolean = true;
  loader: boolean = false;

  constructor(private service: AppserviceService, public router: Router, private cdr: ChangeDetectorRef, @Inject(PLATFORM_ID) private platformid: object) {

    if (!isPlatformBrowser(this.platformid)) {
      this.display = false;
    }

    this.router.events.subscribe((routerEvent: RouterEvent) => {

      if (routerEvent instanceof NavigationStart) {
        this.service.loaderStatus = true;
        this.cdr.detectChanges();
        this.loader = true;
      }

      if (routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationCancel || routerEvent instanceof NavigationError) {
        this.service.loaderStatus = false;
        this.cdr.detectChanges();
        this.loader = true;
      }
    });

  }

  get waitLoader() {
    return this.service.waitLoader;
  }
}
