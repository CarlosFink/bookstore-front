import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Livro } from "../livro.model";
import { LivroService } from "../livro.service";

@Component({
  selector: "app-livro-read-all",
  templateUrl: "./livro-read-all.component.html",
  styleUrls: ["./livro-read-all.component.css"],
})
export class LivroReadAllComponent implements OnInit {
  livros: Livro[] = [];
  id_cat: string = "";
  displayedColumns: string[] = ["id", "titulo", "livros", "acoes"];

  constructor(
    private livroService: LivroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get("id");
    this.findAll();
  }

  findAll(): void {
    this.livroService.findAllByCategoria(this.id_cat).subscribe((resp) => {
      this.livros = resp;
      console.log(this.livros);
    });
  }

  criarLivro(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros/create`]);
  }
}
