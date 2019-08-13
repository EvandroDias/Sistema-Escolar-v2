import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-radio-input',
  templateUrl: './radio-input.component.html',
  styleUrls: ['./radio-input.component.css']
})
export class RadioInputComponent implements OnInit {

  @Input() status:any = "true";
  @Input() titulo:string;
  @Output() alterou = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  mudou(){
    this.alterou.emit(this.status)
  }

}
