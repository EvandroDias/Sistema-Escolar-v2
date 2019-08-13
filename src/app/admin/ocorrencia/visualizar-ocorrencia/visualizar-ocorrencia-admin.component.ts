import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { OcorrenciaService } from "src/app/services/ocorrencia/ocorrencia.service";
import { Location } from "@angular/common";
import * as jspdf from "jspdf";
import html2canvas from "html2canvas";
import { OcorrenciaModel } from "src/app/model/ocorrencia/ocorrencia.model";

@Component({
  selector: "app-visualizar-ocorrencia-admin",
  templateUrl: "./visualizar-ocorrencia-admin.component.html",
  styleUrls: ["./visualizar-ocorrencia-admin.component.css"]
})
export class VisualizarOcorrenciaAdminComponent implements OnInit {
  id: string = null;
  inscricao: Subscription;
  ocorrenciaModel = new OcorrenciaModel();
  showSpinner: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private ocorrenciaService: OcorrenciaService,
    private location: Location
  ) {
    this.inscricao = this.route.params.subscribe((params: any) => {
      this.id = params["id"];

      if (this.id != null) {
        this.detalhe();
      } else {
        //this.ocorrenciaModel.dataOcorrencia = this.dataHoje();
      }
    });
  }

  ngOnInit() {}

  voltar() {
    this.location.back();
  }
  imprimir() {
    this.showSpinner = true;
    var data = document.getElementById("contentToConvert");
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL("image/png");
      let pdf = new jspdf("p", "mm", "a4"); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
      //pdf.save('MYPdf.pdf'); // Generated PDF
      window.open(pdf.output("bloburl"));
      this.showSpinner = false;
    });
  }

  detalhe() {
    this.ocorrenciaService.detalhe(this.id).subscribe(
      f => {
        if (f != null) {
          this.ocorrenciaModel = f;
          console.log(f);
        }
      },
      erro => {}
    );
  }
}
