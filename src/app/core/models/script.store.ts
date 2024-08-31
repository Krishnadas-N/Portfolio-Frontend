export interface Scripts {
  name: string;
  src: string;
}

export interface Styles {
  name: string;
  href: string;
}

export const ScriptStore: Scripts[] = [
  { name: 'jquery', src: 'assets/js/jquery-3.6.4.js' },
  { name: 'bootstrap', src: 'assets/js/bootstrap.bundle.min.js' },
  { name: 'aos', src: 'assets/js/aos.js' },
  { name: 'main', src: 'assets/js/main.js' },
];

export const StyleStore: Styles[] = [
  { name: 'bootstrap', href: 'assets/css/bootstrap.min.css' },
  { name: 'aos', href: 'assets/css/aos.css' },
  { name: 'style', href: 'assets/css/style.css' },
  // { name: 'iconoir', href: 'https://cdn.jsdelivr.net/gh/iconoir-icons/iconoir%40main/css/iconoir.css' }  // Corrected URL
];
