import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ApilibreriaService } from '../services/apilibreria.service';
import { AutorLibro } from '../models/autor';
import { MatDialog } from '@angular/material/dialog';
import { DialogListaComponent } from './dialog/dialoglista.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  public lst: any;

  public lst2: any[] = [];

  public columnas: string[] = ['nombre', 'fechaNacimiento'];


  constructor(
    private apilibreria: ApilibreriaService,
    public dialog: MatDialog   
  ) { 
      
  }

  ngOnInit(): void {
    this.getLista();
  }

  getLista(){
    this.apilibreria.getLibreria().subscribe( s => {
      this.lst = s;
      for (let i = 0; i < this.lst.length; i++) {
        this.lst2.push(this.lst[i].lstLibros);
      }
    });
  }

  openAdd(){
    const dialogRef = this.dialog.open(DialogListaComponent, {
      width: '60rem'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getLista();
    });
  }
}