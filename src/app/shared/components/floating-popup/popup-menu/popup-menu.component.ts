import { NgClass } from '@angular/common';
import { Component, output } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroChatBubbleLeftRightSolid,
  heroArrowDownTraySolid,
  heroCalendarDaysSolid,
  heroMoonSolid,
} from '@ng-icons/heroicons/solid';
import {
  heroChatBubbleOvalLeftEllipsisMini,
  heroLanguageMini,
} from '@ng-icons/heroicons/mini';
import { TranslocoModule } from '@ngneat/transloco';
@Component({
  selector: 'app-popup-menu',
  standalone: true,
  imports: [NgClass, NgIconComponent, TranslocoModule],
  templateUrl: './popup-menu.component.html',
  styleUrl: './popup-menu.component.scss',
  providers: [
    provideIcons({
      heroChatBubbleLeftRightSolid,
      heroChatBubbleOvalLeftEllipsisMini,
      heroLanguageMini,
      heroArrowDownTraySolid,
      heroMoonSolid,
      heroCalendarDaysSolid,
    }),
  ],
})
export class PopupMenuComponent {
  optionSelected = output<string>();

  onChangeOption(option: string) {
    this.optionSelected.emit(option);
  }
}
