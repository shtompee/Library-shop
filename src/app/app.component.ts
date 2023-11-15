import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
@HostListener('document:keydown.control.y', ['$event'])
export class AppComponent {
  title = 'library-shop';
  
}


