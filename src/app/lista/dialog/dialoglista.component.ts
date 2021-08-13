import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AutorLibro } from "src/app/models/autor";
import { ApilibreriaService } from "src/app/services/apilibreria.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Libro } from "src/app/models/libro";

@Component({
    templateUrl: 'dialoglista.component.html',
    styleUrls: ['./dialoglista.component.scss']
})

export class DialogListaComponent{

    public lst: any;
    public mayor: any = Number;

    formularioRegistro = new FormGroup({
        //Datos Autor
        id: new FormControl('',[Validators.required]),
        nombre: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
        fechaNacimiento: new FormControl('', [Validators.required]),
        paisOrigen: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
        //Datos Libro 
        titulo: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
        anoPublicacion: new FormControl('', [Validators.required]),
        numeroPaginas: new FormControl('', [Validators.required]),
        cantidadInventario: new FormControl('', [Validators.required])
    });

    //Datos Autor
    public lstLibros: any[] = [];

    //Datos Libro
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
        const listaLibros: Libro = { titulo: this.formularioRegistro.value['titulo'], anoPublicacion: this.formularioRegistro.value['anoPublicacion'], 
            numeroPaginas: this.formularioRegistro.value['numeroPaginas'], cantidadInventario: this.formularioRegistro.value['cantidadInventario'], 
            existencia: false, idAutor: this.formularioRegistro.value['id']};
        this.lstLibros.push(listaLibros);
        const lista: AutorLibro = { id: this.formularioRegistro.value['id'], nombre: this.formularioRegistro.value['nombre'], fechaNacimiento: this.formularioRegistro.value['fechaNacimiento'],
             paisOrigen: this.formularioRegistro.value['paisOrigen'], lstLibros: this.lstLibros};
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