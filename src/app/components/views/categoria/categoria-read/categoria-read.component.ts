import { Categoria } from './../categoria.model';
import { CategoriaService } from './../categoria.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categoria-read',
  templateUrl: './categoria-read.component.html',
  styleUrls: ['./categoria-read.component.css']
})
export class CategoriaReadComponent implements OnInit {

  categorias: Categoria[] = []
  displayedColumns: string[] = ['id', 'nome', 'descricao', 'livros', 'acoes'] 

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.categoriaService.findAll()
      .subscribe(res => {this.categorias = res;})
  }
}
