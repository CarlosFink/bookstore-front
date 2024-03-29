import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-read',
  templateUrl: './livro-read.component.html',
  styleUrls: ['./livro-read.component.css']
})
export class LivroReadComponent implements OnInit {
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

  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }
}
