import { getLocaleEraNames } from '@angular/common';
import { Component } from '@angular/core';
import { Noticia } from 'src/app/interfaces/noticia.interface';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {

  noticias: Noticia[] = []; // array de noticias
  newNoticia: Noticia = {titulo: "", imagen: "", texto: "", fecha: ""} // noticia asociada al formulario

  constructor() {
    this.noticias = [
      {
        titulo: "Aumenta en un 80% el turismo a las playas en verano",
        imagen: 'https://cdn.discordapp.com/attachments/933755707235393537/1127324477148119170/tropical-beach.jpg',
        texto: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rutrum semper urna, at bibendum lectus 
        posuere vel. Pellentesque mattis nisl ut vehicula suscipit. Vestibulum viverra tempus augue eget iaculis. Phasellus 
        venenatis tortor nulla, id sodales nulla volutpat vel. Nullam pellentesque placerat felis, nec tincidunt eros molestie 
        eu. Curabitur quis rhoncus neque. Morbi maximus nulla nec felis vulputate pellentesque. Maecenas vulputate bibendum 
        orci, non egestas erat placerat vitae. Maecenas et molestie metus, in aliquam nunc. Sed eu ornare metus. Maecenas 
        pretium sem vel dignissim sagittis.`,
        fecha: "01/07/2023"
      },
      {
        titulo: "Los mejores videojuegos del 2023",
        imagen: 'https://cdn.discordapp.com/attachments/933755707235393537/1127323622307008562/The-Legend-of-Zelda-Tears-of-the-Kingdom-Screenshot-055.png',
        texto: `Suspendisse potenti. Suspendisse facilisis gravida fringilla. Pellentesque eget hendrerit nunc, eget 
        elementum felis. Aliquam lectus justo, gravida non facilisis eu, rutrum id tortor. Vestibulum ante ipsum primis in 
        faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse tempor dolor in magna placerat suscipit. Duis vel 
        sodales est, id malesuada libero. Morbi condimentum semper dui quis aliquam. Sed eu cursus ex, quis dignissim mauris. 
        Aenean ex odio, ultrices vel libero eu, rutrum cursus tellus.`,
        fecha: "07/07/2023"
      },
    ]
  }

  cargarNoticias(): string {
    // función que carga todos los artículos de noticias en la section de clase="listado"
    let html: string = "";
    this.noticias.forEach(noticia => {
      html += `
        <article class="post">
          <img src="${noticia.imagen}" alt="${noticia.titulo}" />
          <div class="post__body">
            <h2 class="post__title">${noticia.titulo}</h2>
            <div class="post__date">Posteado el ${noticia.fecha}</div>
            <p>${noticia.texto}</p>
          </div>
        </article>`;
    })
    return html;
  }

  validarTitulo(): boolean {
    //función que revisa que haya un título
    let valid: boolean = this.newNoticia.titulo !== "";
    if (!valid)
      document.getElementById("titulo")?.classList.add("invalid");
    else
      document.getElementById("titulo")?.classList.remove("invalid");
    return valid;
  }

  validarCuerpo(): boolean {
    //función que revisa que haya un cuerpo o texto
    let valid: boolean = this.newNoticia.texto !== "";
    if (!valid)
      document.getElementById("texto")?.classList.add("invalid");
    else
      document.getElementById("texto")?.classList.remove("invalid");
    return valid;
  }

  validarFecha(): boolean {
    // función que revisa que el string de fecha es válido (dd/mm/aaaa)
    let valid: boolean = false;
    // separamos cada campo y lo convertimos en número
    if (this.newNoticia.fecha !== "") {
      let fecha = this.newNoticia.fecha.split('/').map(num => Number(num));
      if ((fecha.length === 3) && (!Number.isNaN(fecha[0])) && (!Number.isNaN(fecha[1])) && (!Number.isNaN(fecha[2])))  {
        // revisamos que los días, meses y años estén en rango, y si el número de día corresponde al mes
        if ((fecha[2] > 2000) && (fecha[1] >=1) && (fecha[1] <= 12) && (fecha[0] >= 1)) {
          switch (fecha[1]) {
            // meses con 31 días
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
              valid = (fecha[0] <= 31);
              break;
            // meses con 30 días
            case 4:
            case 6: 
            case 9: 
            case 11:
              valid = (fecha[0] <= 30);
              break;
            // mes de febrero, revisamos además si es año bisiesto
            case 2:
              valid = ((fecha[2] % 4 === 0) && (fecha[0] <= 29)) || ((fecha[2] % 4 !== 0) && (fecha[0] <= 28));
              break;
          }
        }
      }
    }
    if (!valid)
      document.getElementById("fecha")?.classList.add("invalid");
    else
      document.getElementById("fecha")?.classList.remove("invalid");
    return valid;
  }

  validarUrlImagen(): boolean {
    // función que valida si el string de url de imagen tiene  formato correcto (empieza por http:// o https://, y es jpg o png)
    let valid = false;
    if (this.newNoticia.imagen !== "") {
      let urlHttp = this.newNoticia.imagen.split('://');
      if (typeof urlHttp !== "undefined") {
        let urlDomain = urlHttp[1].split('/');
        if (typeof urlDomain !== "undefined") {
          let urlFile = urlDomain[urlDomain.length-1].split('.');
          valid = ((typeof urlFile !== "undefined") &&
            ((urlHttp[0] === "http") || (urlHttp[0] === "https")) &&
            ((urlFile[urlFile.length-1].includes("jpeg")) || (urlFile[urlFile.length-1].includes("jpg")) || 
              (urlFile[urlFile.length-1].includes("png"))
            )
          );
        }
      }
    }
    if (!valid)
      document.getElementById("imagen")?.classList.add("invalid");
    else
      document.getElementById("imagen")?.classList.remove("invalid");
    return valid;
  }

  guardarNoticia(): void {
    // hacemos validaciones de campos vacíos y miramos cosas extra en el caso de imagen y fecha
    if ((this.validarTitulo()) && (this.validarUrlImagen()) && (this.validarFecha()) && (this.validarCuerpo())) {
      // añadimos al array y borramos los valores de newNoticia
      this.noticias.push(this.newNoticia);
      this.newNoticia = {titulo: "", imagen: "", texto: "", fecha: ""};
    } else {
      // hay al menos un campo vacío o la url o fecha no están bien
      alert("El formulario no es válido. Todos los campos son obligatorios.");
    }
  }

}
