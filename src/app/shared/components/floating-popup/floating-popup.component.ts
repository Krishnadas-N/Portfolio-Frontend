import { CommonModule, NgClass } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  inject,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroBackwardMini,
} from '@ng-icons/heroicons/mini';
import { TranslocoModule } from '@ngneat/transloco';
import { PopupMenuComponent } from './popup-menu/popup-menu.component';

@Component({
  selector: 'app-floating-popup',
  standalone: true,
  imports: [
    NgClass,
    NgIconComponent,
    TranslocoModule,
    CommonModule,
    PopupMenuComponent,
  ],
  templateUrl: './floating-popup.component.html',
  styleUrl: './floating-popup.component.scss',
  providers: [
    provideIcons({
      heroBackwardMini
    }),
  ],
})
export class FloatingPopupComponent {
  private readonly options: string[] = [
    'ChatWithMe',
    'LiveChat',
    'ChangeLanguage',
    'DownloadResume',
    'BookAppointment',
    'ToggleTheme',
  ];
  selectedOption: string | null = null;
  isPopupVisible = false;
  @ViewChild('ContainerOptionComponent', { read: ViewContainerRef })
  containerOptionComponent!: ViewContainerRef;
  cdr = inject(ChangeDetectorRef);

  async changeOptions(option: string) {
    if (this.options.includes(option)) {
      this.containerOptionComponent?.clear();
      this.selectedOption=option;
      switch (option) {
        case this.options[0]:
          const { ChatOptionComponent } = await import(
            './chat-option/chat-option.component'
          );
          this.containerOptionComponent.createComponent(ChatOptionComponent);
          break;
        case this.options[2]:
          const {LanguageOptionComponent  } = await import(
            './language-option/language-option.component'
          );
          this.containerOptionComponent.createComponent(LanguageOptionComponent);
          break;
         default:
          console.error('Unknown option selected');
      }
      this.cdr.detectChanges();
    }
  }
  togglePopup() {
    this.isPopupVisible = !this.isPopupVisible;
  }
  goBackToMenu() {
    this.selectedOption = null;
    this.containerOptionComponent.clear();
    this.cdr.detectChanges();
  }
}
