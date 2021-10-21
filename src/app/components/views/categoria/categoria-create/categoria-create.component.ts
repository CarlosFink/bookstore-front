import { Router } from "@angular/router";
import { CategoriaService } from "./../categoria.service";
import { Categoria } from "./../categoria.model";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-categoria-create",
  templateUrl: "./categoria-create.component.html",
  styleUrls: ["./categoria-create.component.css"],
})
export class CategoriaCreateComponent implements OnInit {
  categoria: Categoria = {
    nome: "",
    descricao: "",
  };

  constructor(
    private categoriaService: CategoriaService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  create(): void {
    this.categoriaService.create(this.categoria).subscribe(
      (res) => {
        console.log(res);
        this.categoriaService.message("Categoria incluída com sucesso");
        this.router.navigate(["categorias"]);
      },
      (err) => {
        console.log(err);
        err.error.erros.forEach((e) => {
          this.categoriaService.message(e.message);
        });
      }
    );
  }

  cancel(): void {
    this.router.navigate(["categorias"]);
  }
}
