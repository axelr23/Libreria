import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AutorLibro } from "src/app/models/autor";
import { ApilibreriaService } from "src/app/services/apilibreria.service";
import { FormControl, FormGroup } from "@angular/forms";
import { Libro } from "src/app/models/libro";

@Component({
    templateUrl: 'dialoglista.component.html',
    styleUrls: ['./dialoglista.component.scss']
})

export class DialogListaComponent{

    //Datos Autor
    public id: any;
    public nombre: any;
    public fechaNacimiento: any;
    public paisOrigen: any;
    public lstLibros: any[] = [];

    //Datos Libro
    public titulo: any;
    public anoPublicacion: any;
    public numeroPaginas: any;
    public cantidadInventario: any;
    public existencia: any;
    public idAutor: any;



    constructor( 
        public dialogRef: MatDialogRef<DialogListaComponent>,
        public apiLista: ApilibreriaService,
        public snackBar: MatSnackBar,
    ){}
    close(){
        this.dialogRef.close();
    }

    addLista(){
        const listaLibros: Libro = { titulo: this.titulo, anoPublicacion: this.anoPublicacion, numeroPaginas: this.numeroPaginas, 
        cantidadInventario: this.cantidadInventario, existencia: this.existencia, idAutor: this.id};
        this.lstLibros.push(listaLibros);
        const lista: AutorLibro = { id: this.id, nombre: this.nombre, fechaNacimiento: this.fechaNacimiento, paisOrigen: this.paisOrigen, lstLibros: this.lstLibros};
        this.apiLista.add(lista).subscribe(reponse => {
            if(reponse != null) {
                this.dialogRef.close();
                this.snackBar.open('Datos Insertados con éxito','', {
                    duration: 2000
                });
            }
        });
    }
}