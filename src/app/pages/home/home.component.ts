import { Component,OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
 

  fullText = 'Passionate Frontend Developer';
  displayText = '';
  currentIndex = 0;
  charIndex = 0;
  isDeleting = false;

  ngOnInit() {
    this.startTyping();
  }


  startTyping() {
    const typingInterval = setInterval(() => {
      if (this.currentIndex < this.fullText.length) {
        this.displayText += this.fullText[this.currentIndex];
        this.currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100); // speed: 100ms per character
  }

  downloadCV() {
    const link = document.createElement('a');
    link.href = 'assets/pdf/HeinThiriCV.pdf';
    link.download = 'HeinThiri_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}
