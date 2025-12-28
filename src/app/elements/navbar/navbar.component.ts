import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  menuOpen: boolean = false;
  currentSection: string = 'home';
  languageMenuOpen: boolean = false;
  currentLanguage: string = 'EN';

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.language-selector')) {
      this.languageMenuOpen = false;
    }
    // Close menu if clicking outside, but not on toggle button
    if (this.menuOpen && !target.closest('.nav-links') && !target.closest('.nav-toggle') && !target.closest('.language-selector')) {
      this.closeMenu();
    }
  }

  onMenuClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    // If clicking directly on nav-links container (backdrop area), close menu
    if (target.classList.contains('nav-links')) {
      event.stopPropagation();
      this.closeMenu();
    }
    // Otherwise, let the click propagate to links (they will close menu via setActive)
  }

  toggleMenu(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.menuOpen = !this.menuOpen;
    if (this.menuOpen) {
      this.languageMenuOpen = false;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
  
  closeMenu() {
    this.menuOpen = false;
    document.body.style.overflow = '';
  }

  setActive(section: string) {
    this.currentSection = section;
    this.closeMenu();
  }

  toggleLanguageMenu(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.languageMenuOpen = !this.languageMenuOpen;
    if (this.languageMenuOpen) {
      this.menuOpen = false;
    }
  }

  selectLanguage(lang: string, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.currentLanguage = lang;
    this.languageMenuOpen = false;
  }
}

