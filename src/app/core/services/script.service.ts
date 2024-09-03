import { Injectable, Renderer2 } from '@angular/core';
import { ScriptStore, StyleStore } from '../models/script.store';

declare var document: any;

@Injectable()
export class ScriptService {
  private scripts: any = {};
  private styles: any = {};

  constructor(private renderer: Renderer2) {
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src,
      };
    });

    StyleStore.forEach((style: any) => {
      this.styles[style.name] = {
        loaded: false,
        href: style.href,
      };
    });
  }

  loadScripts(...scripts: string[]) {
    const promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  loadStyles(...styles: string[]) {
    styles.forEach((style) => this.loadStyle(style));
  }

  private loadScript(name: string) {
    return new Promise((resolve, reject) => {
      if (this.scripts[name].loaded) {
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      } else {
        const script = this.renderer.createElement('script');
        script.type = 'text/javascript';
        script.src = this.scripts[name].src;
        script.async = true;
        script.defer = true;
        script.onload = () => {
          this.scripts[name].loaded = true;
          resolve({ script: name, loaded: true, status: 'Loaded' });
        };
        script.onerror = (error: any) =>
          reject({ script: name, loaded: false, status: 'Load Failed' });
        this.renderer.appendChild(document.body, script);
      }
    });
  }

  private loadStyle(name: string) {
    if (this.styles[name].loaded) {
      return;
    }
    const link = this.renderer.createElement('link');
    link.rel = 'stylesheet';
    link.href = this.styles[name].href;
    this.renderer.appendChild(document.head, link);
    this.styles[name].loaded = true;
  }
}
