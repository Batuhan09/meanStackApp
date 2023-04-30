import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  title;
  content;
  constructor(@Inject(MAT_DIALOG_DATA) public data) {
    console.log(data)
    this.title = data.t;
    this.content = data.c;
  }

  ngOnInit(): void {
  }
}
