export interface Noticia {
    titulo: string,
    imagen: string,
    texto: string,
    fecha: string // se debería cambiar a tipo Date en un futuro, pero mejor esperar a ver validaciones en Angular en clase antes
}
