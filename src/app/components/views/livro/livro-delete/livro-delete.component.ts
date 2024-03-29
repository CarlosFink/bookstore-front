import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Livro } from "../livro.model";
import { LivroService } from "../livro.service";

@Component({
  selector: "app-livro-delete",
  templateUrl: "./livro-delete.component.html",
  styleUrls: ["./livro-delete.component.css"],
})
export class LivroDeleteComponent implements OnInit {
  id_cat: string = "";
  livro: Livro = {
    titulo: "",
    nomeAutor: "",
    texto: "",
  };

  constructor(
    private livroService: LivroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get("id_cat");
    this.livro.id = this.route.snapshot.paramMap.get("id");
    this.findById();
  }

  findById(): void {
    this.livroService.findById(this.livro.id).subscribe((resp) => {
      this.livro = resp;
    });
  }

  delete(): void {
    this.livroService.delete(this.livro.id).subscribe(
      () => {
        this.router.navigate([`categorias/${this.id_cat}/livros`])
        this.livroService.message("Livro excluido com sucesso")
      },
      err => {
        this.router.navigate([`categorias/${this.id_cat}/livros`])
        this.livroService.message("Falha ao excluir o livro")
      }
    )
  }

  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }
}
