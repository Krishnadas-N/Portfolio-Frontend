import { Component, inject } from '@angular/core';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-language-option',
  standalone: true,
  imports: [],
  templateUrl: './language-option.component.html',
  styleUrl: './language-option.component.scss'
})
export class LanguageOptionComponent {
  langService=inject(LanguageService)
  languages = [
    { code: 'en', name: 'English', flag: 'assets/images/flags/united-states-of-america-flag.png' },
    { code: 'ar', name: 'Arabic', flag: 'assets/images/flags/saudi-arabia-flag.png' },
    { code: 'hi', name: 'Hindi', flag: 'assets/images/flags/india-flag.png' },
    { code: 'ml', name: 'Malayalam', flag: 'assets/images/flags/india-flag.png' },
    { code: 'es', name: 'Spanish', flag: 'assets/images/flags/spain-flag.png' }
  ];
   selectLanguage(language: string) {
    this.langService.switchLanguage(language)
  }
}
