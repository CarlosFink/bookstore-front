import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-read',
  templateUrl: './livro-read.component.html',
  styleUrls: ['./livro-read.component.css']
})
export class LivroReadComponent implements OnInit {

  livros: Livro[] = []
  id_cat: string = ''
  displayedColumns: string[] = ['id', 'titulo', 'livros', 'acoes'] 

  constructor(
    private livroService: LivroService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id')
    this.findAll()
  }

  findAll(): void {
    this.livroService.findAllByCategoria(this.id_cat).subscribe
      ((resp) => {this.livros = resp;
      console.log(this.livros)
      })
  }

}
