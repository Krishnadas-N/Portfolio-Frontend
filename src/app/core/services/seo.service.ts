import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(
    private titleService: Title,
    private metaService: Meta,
    private router: Router
  ) {}

  /**
   * Set the title of the page
   * @param title - The title of the page
   */
  setTitle(title: string) {
    this.titleService.setTitle(title);
  }

  /**
   * Set meta tags for description, keywords, and author
   * @param description - The description of the page
   * @param keywords - The keywords associated with the page
   * @param author - The author of the content
   */
  setMetaTags(
    description: string,
    keywords: string,
    author: string = 'Krishnadas N'
  ) {
    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({ name: 'keywords', content: keywords });
    this.metaService.updateTag({ name: 'author', content: author });
  }

  /**
   * Set Open Graph meta tags for social sharing
   * @param title - The title of the page
   * @param description - The description of the page
   * @param imageUrl - The URL of the image to be displayed when sharing
   */
  setOpenGraphTags(title: string, description: string, imageUrl: string) {
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({
      property: 'og:description',
      content: description,
    });
    this.metaService.updateTag({ property: 'og:image', content: imageUrl });
    this.metaService.updateTag({
      property: 'og:url',
      content: this.router.url,
    });
  }

  /**
   * Set Twitter Card meta tags for Twitter sharing
   * @param title - The title of the page
   * @param description - The description of the page
   * @param imageUrl - The URL of the image to be displayed when sharing
   */
  setTwitterCard(title: string, description: string, imageUrl: string) {
    this.metaService.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    });
    this.metaService.updateTag({ name: 'twitter:title', content: title });
    this.metaService.updateTag({
      name: 'twitter:description',
      content: description,
    });
    this.metaService.updateTag({ name: 'twitter:image', content: imageUrl });
  }

  /**
   * Set canonical URL for the page
   * @param url - The canonical URL of the page
   */
  setCanonicalURL(url: string) {
    let link: HTMLLinkElement | null = document.querySelector(
      'link[rel="canonical"]'
    );
    if (link) {
      link.href = url;
    } else {
      link = this.createLinkTag('canonical', url);
      document.head.appendChild(link);
    }
  }

  /**
   * Set structured data (JSON-LD) for the page
   * @param jsonLdObject - The structured data in JSON-LD format
   */
  setStructuredData(jsonLdObject: any) {
    const scriptTag = document.createElement('script');
    scriptTag.type = 'application/ld+json';
    scriptTag.text = JSON.stringify(jsonLdObject);
    document.head.appendChild(scriptTag);
  }

  /**
   * Set noindex and nofollow tags for pages you don't want indexed
   */
  setNoIndexNoFollow() {
    this.metaService.updateTag({
      name: 'robots',
      content: 'noindex, nofollow',
    });
  }

  /**
   * Set alternate language tags for multi-language support
   * @param hrefLangData - Array of {lang: string, url: string}
   */
  setHrefLangTags(hrefLangData: { lang: string; url: string }[]) {
    hrefLangData.forEach((data) => {
      let link: HTMLLinkElement | null = document.querySelector(
        `link[rel="alternate"][hreflang="${data.lang}"]`
      );
      if (!link) {
        link = this.createLinkTag('alternate', data.url, data.lang);
        document.head.appendChild(link);
      }
    });
  }

  /**
   * Helper function to create link tags
   * @param rel - The relationship of the link tag
   * @param href - The URL to be linked
   * @param hreflang - Optional hreflang attribute for alternate languages
   */
  private createLinkTag(
    rel: string,
    href: string,
    hreflang?: string
  ): HTMLLinkElement {
    const link = document.createElement('link');
    link.rel = rel;
    link.href = href;
    if (hreflang) {
      link.hreflang = hreflang;
    }
    return link;
  }

  /**
   * Set viewport for responsive design
   */
  setViewport() {
    this.metaService.updateTag({
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    });
  }

  /**
   * Set favicon
   * @param faviconUrl - URL of the favicon
   */
  setFavicon(faviconUrl: string) {
    let link: HTMLLinkElement | null =
      document.querySelector('link[rel="icon"]');
    if (link) {
      link.href = faviconUrl;
    } else {
      link = this.createLinkTag('icon', faviconUrl);
      document.head.appendChild(link);
    }
  }

  /**
   * Set Google Analytics tracking code
   * @param trackingId - The Google Analytics tracking ID
   */
  setGoogleAnalytics(trackingId: string) {
    const scriptTag = document.createElement('script');
    scriptTag.async = true;
    scriptTag.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    document.head.appendChild(scriptTag);

    const inlineScript = document.createElement('script');
    inlineScript.text = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${trackingId}');
    `;
    document.head.appendChild(inlineScript);
  }
}
