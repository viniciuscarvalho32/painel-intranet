import { Fretes } from "./../../Fretes";
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FretesService } from "src/app/fretes.service";
import { MessagesService } from "src/app/messages.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-fretes-erp",
  templateUrl: "./fretes-erp.component.html",
  styleUrls: ["./fretes-erp.component.css"],
})
export class FretesErpComponent {
  public fretesList: Fretes[] = [];
  public newfreteList: Fretes[] = [];
  showLoading: boolean = false;
  public statusCte: number = 2;
  public filial: string = "";
  public codfilial: number = 0;
  public boxmessageColor: string = "";
  public srcImageLog: string = "";

  constructor(
    private fretes: FretesService,
    private message: MessagesService,
    private router: Router
  ) {}

ngOnInit() {

}

  formFrete = new FormGroup({
    chvCte: new FormControl(''),
  });

  get chvCte() {
    return this.formFrete.get("chvCte")!;
  }

  async carregarFretes() {
    this.showLoading = true;
    await this.fretes.getFretes().subscribe({
      next: (items) => {
        this.fretesList = items.data;
        this.showLoading = false;
      },
    });
  }

  async onSubmit() {

      this.showLoading = true;
      await this.fretes.getFrete(this.formFrete.value).subscribe({
        next: (items) => {
         //console.log(`Chave Reto Subscribe: ${items.message}`)
         if (items.data) {

          this.fretesList = items.data;
          this.fretesList.map((fil) => (this.codfilial = fil.codFil));

          switch (this.codfilial) {
            case 1:
              this.filial = "São José";
              break;
            case 2:
              this.filial = "Chapecó";
              break;
            case 3:
              this.filial = "Curitiba";
              break;
            case 4:
              this.filial = "Jundiaí";
              break;
            case 5:
              this.filial = "Joinville";
              break;
            default:
          }
          this.showLoading = false;
        } else {
          this.showLoading = false;
          this.srcImageLog = "/assets/erro.png";
          this.message.callMsg(items.message!,"red",this.srcImageLog);
          }
        },
      });

  }
  async validarCte(chave: string) {
    this.showLoading = true;
    /*
    let listaFretesNew:Fretes[] = [
      {
      "numCte": 1234545,
      "nomEmi": "Vinicius de Carvalho",
      "cgcFor": 83675413000101,
      "datEmi": new Date(1,1,2023),
      "vlrCte": 452.26,
      "codFil": 1,
      "sigFil": "São José",
      "chvNel": chave,
      "sitNfc": 0
      },
  ]
  setTimeout(() => {
    this.showLoading = false;
    this.message.callMsg("Frete Validado com sucesso!");
  }, 3000);
    this.fretesList = listaFretesNew.filter(item => item.chvNel !== chave);
  */

    await this.fretes.validar(chave).subscribe({
      next: (items) => {

        if (items.data) {
          let retString = items.data;
          this.boxmessageColor = "green";
          this.srcImageLog = "/assets/check.png";
          this.message.callMsg(retString, this.boxmessageColor, this.srcImageLog);
        }
        if (items.message!) {
          let retString = items.message!;
          this.boxmessageColor = "red";
          this.srcImageLog = "/assets/erro.png";
          this.message.callMsg(retString, this.boxmessageColor, this.srcImageLog);
        }
        this.showLoading = false;
        this.fretesList = this.fretesList.filter(
          (chaves) => chaves.chvNel !== chave
        );
      },
    });
  }
}
