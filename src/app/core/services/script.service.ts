import { Injectable } from '@angular/core';
import { ScriptStore, StyleStore } from '../models/script.store';

declare var document: any;

@Injectable()
export class ScriptService {
  private scripts: any = {};
  private styles: any = {};

  constructor() {
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });

    StyleStore.forEach((style: any) => {
      this.styles[style.name] = {
        loaded: false,
        href: style.href
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
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.scripts[name].src;
        script.onload = () => {
          this.scripts[name].loaded = true;
          resolve({ script: name, loaded: true, status: 'Loaded' });
        };
        script.onerror = (error: any) => resolve({ script: name, loaded: false, status: 'Load Failed' });
        document.body.appendChild(script);
      }
    });
  }

  private loadStyle(name: string) {
    if (this.styles[name].loaded) {
      return;
    }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = this.styles[name].href;
    document.head.appendChild(link);
    this.styles[name].loaded = true;
  }
}
