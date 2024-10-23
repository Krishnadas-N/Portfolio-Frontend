import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AppInitializerService {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  public initializeApp(): () => void {
    return () => {
      if (isPlatformBrowser(this.platformId)) {
        const styles: any[] = Array.prototype.slice.call(
          this.document.querySelectorAll(`style[ng-transition]`)
        );
        styles.forEach((el) => {
          // Remove ng-transition attribute to prevent Angular appInitializerFactory
          // from removing server styles before preboot completes
          el.removeAttribute('ng-transition');
        });
        this.document.addEventListener('PrebootComplete', () => {
          // After Preboot is complete, remove the server styles
          styles.forEach((el) => el.remove());
        });
      }
    };
  }
}
