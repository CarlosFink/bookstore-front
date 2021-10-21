import { Categoria } from "./../categoria.model";
import { CategoriaService } from "./../categoria.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-categoria-delete",
  templateUrl: "./categoria-delete.component.html",
  styleUrls: ["./categoria-delete.component.css"],
})
export class CategoriaDeleteComponent implements OnInit {
  categoria: Categoria;
  id: String;

  constructor(
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.findById();
  }

  private findById(): void {
    this.categoriaService.findById(this.id).subscribe((categoria) => {
      this.categoria = categoria;
    });
  }

  delete(): void {
    this.categoriaService.delete(this.categoria.id).subscribe(
      (res) => {
        this.categoriaService.message("Categoria excluída com sucesso");
        this.router.navigate(["categorias"]);
      },
      (err) => {
        this.categoriaService.message(err.error.message);
      }
    );
  }

  cancel(): void {
    this.router.navigate(["categorias"]);
  }
}
