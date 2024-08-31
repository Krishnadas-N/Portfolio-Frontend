import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ScriptService } from '../../../core/services/script.service';
import { isPlatformBrowser } from '@angular/common';
import { HeaderComponent } from '../../../core/components/header/header.component';
import { FooterComponent } from '../../../core/components/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,RouterOutlet],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss',
  providers:[ScriptService]
})
export class UserLayoutComponent {
  constructor(private scriptService: ScriptService,
    @Inject(PLATFORM_ID) private platformId:Object) { }

  ngOnInit() {
    if(isPlatformBrowser(this.platformId)){
         // Load CSS styles
    this.scriptService.loadStyles('bootstrap', 'aos', 'style', 'iconoir');

    // Load JS scripts
    this.scriptService.loadScripts('jquery', 'bootstrap', 'aos', 'main')
      .then(data => console.log('Scripts loaded successfully', data))
      .catch(error => console.log('Failed to load scripts:', error));
    }

  }
}
