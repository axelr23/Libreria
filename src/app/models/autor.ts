import { Libro } from "./libro";

export interface AutorLibro{
    id: number;
    nombre: string;
    fechaNacimiento: Date;
    paisOrigen: string; 
    lstLibros: Libro[];
}