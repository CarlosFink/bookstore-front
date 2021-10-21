import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Livro } from "../livro.model";
import { LivroService } from "../livro.service";

@Component({
  selector: "app-livro-update",
  templateUrl: "./livro-update.component.html",
  styleUrls: ["./livro-update.component.css"],
})
export class LivroUpdateComponent implements OnInit {
  id_cat: string = "";
  livro: Livro = {
    titulo: "",
    nomeAutor: "",
    texto: "",
  };

  titulo = new FormControl("", [Validators.minLength(3)]);
  nomeAutor = new FormControl("", [Validators.minLength(5)]);
  texto = new FormControl("", Validators.minLength(10));

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

  update(): void {
    this.livroService.update(this.livro).subscribe(
      (resp) => {
        this.router.navigate([`categorias/${this.id_cat}/livros`]);
        this.livroService.message("Livro atualizado com sucesso");
      },
      (err) => {
        this.router.navigate([`categorias/${this.id_cat}/livros`]);
        this.livroService.message("Falha ao atualizar livro!");
      }
    );
  }

  getMessage() {
    if (this.titulo.invalid) {
      return "O campo Título deve conter entre 3 e 100 caracteres";
    }
    if (this.nomeAutor.invalid) {
      return "O campo Nome Autor deve conter entre 5 e 100 caracteres";
    }
    if (this.texto.invalid) {
      return "O campo Texto deve conter entre 10 e 2.000.000 caracteres";
    }
    return false;
  }

  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }
}
