import { Component, OnInit, Input } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { FiltroOcorrenciaModel } from 'src/app/model/ocorrencia/filtro-ocorrencia.model';




@Component({
  selector: 'app-grafico-ocorrencia',
  templateUrl: './grafico-ocorrencia.component.html',
  styleUrls: ['./grafico-ocorrencia.component.css']
})
export class GraficoOcorrenciaComponent implements OnInit {

  @Input()Labels:string[] = [];
  @Input()Type:string = 'bar';
  @Input()Legend:boolean = true;
  @Input()Data: any;
  @Input()scaleShowVerticalLines:boolean = false;
  @Input() filtroOcorrenciaModel:FiltroOcorrenciaModel;



  public Options:any = {
    scaleShowVerticalLines: this.scaleShowVerticalLines,
    responsive: true,
    scales : {
      yAxes: [{
         ticks: {
          beginAtZero: true,
          //stepSize: 1,
          callback: function(value) {if (value % 1 === 0) {return value;}},

          //max : 50,
          }
      }]
    }
  };

  constructor() { }

  ngOnInit() {
   // console.log('grafico',this.Data);

  }

  public Clicked(e:any):void {
    //console.log(e);
  }

  public Hovered(e:any):void {
   // console.log(e);
  }

  /*imprimir(){
    //this.showSpinner = true;
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      //pdf.save('MYPdf.pdf'); // Generated PDF
      window.open(pdf.output('bloburl'));
      //this.showSpinner = false;
    });
  }*/

  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

}
