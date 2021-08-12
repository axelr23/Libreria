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

    public lst: any;
    public mayor: any = Number;

    //Datos Autor
    public id: any = new FormControl('');
    public nombre: any = new FormControl('');
    public fechaNacimiento: any = new FormControl('');
    public paisOrigen: any = new FormControl('');
    public lstLibros: any[] = [];

    //Datos Libro
    public titulo: any = new FormControl('');
    public anoPublicacion: any = new FormControl('');
    public numeroPaginas: any = new FormControl('');
    public cantidadInventario: any = new FormControl('');
    public existencia: any = false;
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
        const listaLibros: Libro = { titulo: this.titulo.value, anoPublicacion: this.anoPublicacion.value, 
            numeroPaginas: this.numeroPaginas.value, cantidadInventario: this.cantidadInventario.value, 
            existencia: false, idAutor: this.id.value};
        this.lstLibros.push(listaLibros);
        const lista: AutorLibro = { id: this.id.value, nombre: this.nombre.value, fechaNacimiento: this.fechaNacimiento.value,
             paisOrigen: this.paisOrigen.value, lstLibros: this.lstLibros};
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