import { NgClass } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isMenuOpen = false;

  constructor(private router: Router) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }
}
