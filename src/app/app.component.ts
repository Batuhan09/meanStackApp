import { Component } from '@angular/core';
import { ApiService } from 'src/service/api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CHAT APP';
  a=true
  htmlStr
  if (a) {
    this.htmlStr = 'Plain Text Example &amp; <strong>Bold Text Example</strong>';
  }
    constructor(private apiService: ApiService){
  }
}
