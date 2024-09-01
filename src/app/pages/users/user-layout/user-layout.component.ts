import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ScriptService } from '../../../core/services/script.service';
import { isPlatformBrowser } from '@angular/common';
import { HeaderComponent } from '../../../core/components/header/header.component';
import { FooterComponent } from '../../../core/components/footer/footer.component';
import {
  RouterOutlet,
  Router,
  NavigationStart,
  NavigationCancel,
  NavigationError,
  NavigationEnd,
} from '@angular/router';
import { LoaderComponent } from '../../../core/components/loader/loader.component';
import { LoaderService } from '../../../core/services/loader.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet, LoaderComponent],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss',
  providers: [ScriptService],
})
export class UserLayoutComponent implements OnInit {
  constructor(
    private scriptService: ScriptService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private loaderService: LoaderService
  ) {
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
      // Load CSS styles
      this.scriptService.loadStyles('bootstrap', 'aos', 'style');

      // Load JS scripts
      this.scriptService
        .loadScripts('jquery', 'aos', 'bootstrap')
        .then(() => this.scriptService.loadScripts('main'))
        .then((data) => console.log('All scripts loaded successfully', data))
        .catch((error) => console.log('Failed to load a script:', error));
    }
  }
}
