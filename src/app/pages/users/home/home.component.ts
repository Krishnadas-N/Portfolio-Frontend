import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { SeoService } from '../../../core/services/seo.service';
import { isPlatformBrowser } from '@angular/common';
import { Profile } from '../../../core/models/user.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  userData: Profile={
    "name": "David Henderson",
    "role": "A WEB DESIGNER",
    "location": "San Francisco",
    "experienceYears": 7,
    "clients": 125,
    "projects": 210,
    "services": ["Design", "Development"],
    "profiles": [
      { "name": "Dribbble", "link": "https://dribbble.com", "icon": "iconoir-dribbble" },
      { "name": "Twitter", "link": "https://twitter.com", "icon": "iconoir-twitter" }
    ]
  }
  ;
  constructor(private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId:Object
  ) {}
  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)){
    // Set SEO meta tags
    this.seoService.setTitle('Home - Krishnadas N Portfolio');
    this.seoService.setMetaTags('Welcome to my portfolio', 'portfolio, Angular, Krishnadas N', 'Krishnadas N');

    // Set Open Graph Tags
    this.seoService.setOpenGraphTags(
      'Home - Krishnadas N Portfolio',
      'Welcome to my portfolio',
      'https://yourdomain.com/assets/images/og-image.jpg'
    );

    // Set Twitter Card
    this.seoService.setTwitterCard(
      'Home - Krishnadas N Portfolio',
      'Welcome to my portfolio',
      'https://yourdomain.com/assets/images/twitter-image.jpg'
    );

    // Set Canonical URL
    this.seoService.setCanonicalURL('https://yourdomain.com/');

    // Optionally, set structured data
    this.seoService.setStructuredData({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Krishnadas N",
      "url": "https://yourdomain.com/",
      "sameAs": [
        "https://www.linkedin.com/in/krishnadas-n/",
        "https://twitter.com/krishnadas_n"
      ]
    });
  }
  }
}
