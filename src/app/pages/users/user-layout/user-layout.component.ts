import { Component, OnInit, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd, NavigationStart, NavigationCancel, NavigationError, RouterOutlet } from '@angular/router';
import { ScriptService } from '../../../core/services/script.service';
import { HeaderComponent } from '../../../core/components/header/header.component';
import { FooterComponent } from '../../../core/components/footer/footer.component';
import { LoaderComponent } from '../../../core/components/loader/loader.component';
import { LoaderService } from '../../../core/services/loader.service';
import * as AOS from 'aos';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet, LoaderComponent],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss',
  providers: [ScriptService],
})
export class UserLayoutComponent implements  OnInit, AfterViewInit, OnDestroy {
  constructor(
    private scriptService: ScriptService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private loaderService: LoaderService
  ) {
    // Show/hide loader during navigation
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loaderService.showLoader();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loaderService.hideLoader();
      }
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Load styles and scripts in the browser only
      this.scriptService.loadStyles('bootstrap', 'style');
      this.scriptService
        .loadScripts('bootstrap')
        .then(() => {
          // AOS initialization after scripts are loaded
          AOS.init({
            duration: 1500,
            once: true,
        })
        })
        .catch((error) => console.log('Failed to load a script:', error));


    }
  }
  ngAfterViewInit(): void {

  }

  ngOnDestroy() {

  }
}
