import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Categoria } from "../categoria.model";
import { CategoriaService } from "../categoria.service";

@Component({
  selector: "app-categoria-update",
  templateUrl: "./categoria-update.component.html",
  styleUrls: ["./categoria-update.component.css"],
})
export class CategoriaUpdateComponent implements OnInit {
  categoria: Categoria = {
    id: "",
    nome: "",
    descricao: "",
  };

  constructor(
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoria;
    this.categoria.id = this.route.snapshot.paramMap.get("id");
    this.findById();
  }

  findById(): void {
    this.categoriaService.findById(this.categoria.id).subscribe((resp) => {
      this.categoria.nome = resp.nome;
      this.categoria.descricao = resp.descricao;
    });
  }

  update(): void {
    this.categoriaService.update(this.categoria).subscribe(
      () => {
        this.categoriaService.message("Categoria Atualizada com sucesso");
        this.router.navigate(["categorias"]);
      },
      (err) => {
        this.categoriaService.message(
          "Verificar se todos os campos foram preenchidos"
        );
      }
    );
  }

  cancel(): void {
    this.router.navigate(["categorias"]);
  }
}
