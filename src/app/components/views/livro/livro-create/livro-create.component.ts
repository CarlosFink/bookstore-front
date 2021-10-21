import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Livro } from "../livro.model";
import { LivroService } from "../livro.service";

@Component({
  selector: "app-livro-create",
  templateUrl: "./livro-create.component.html",
  styleUrls: ["./livro-create.component.css"],
})
export class LivroCreateComponent implements OnInit {
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
    this.id_cat = this.route.snapshot.paramMap.get("id");
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

  create(): void {
    console.log(this.livro);
    this.livroService.create(this.livro, this.id_cat).subscribe(
      (resp) => {
        this.router.navigate([`categorias/${this.id_cat}/livros`]);
        this.livroService.message("Livro criado com sucesso!");
      },
      (err) => {
        console.log(err);
        this.livroService.message("Erro ao criar novo livro!");
      }
    );
  }

  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }
}
