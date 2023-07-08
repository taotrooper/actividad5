import { getLocaleEraNames } from '@angular/common';
import { Component } from '@angular/core';
import { Noticia } from 'src/app/interfaces/noticia.interface';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {

  noticias: Noticia[] = [];
  newNoticia: Noticia = {titulo: "", imagen: "", texto: "", fecha: ""}

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
        fecha: "01-07-2023"
      },
      {
        titulo: "Los mejores videojuegos del 2023",
        imagen: 'https://cdn.discordapp.com/attachments/933755707235393537/1127323622307008562/The-Legend-of-Zelda-Tears-of-the-Kingdom-Screenshot-055.png',
        texto: `Suspendisse potenti. Suspendisse facilisis gravida fringilla. Pellentesque eget hendrerit nunc, eget 
        elementum felis. Aliquam lectus justo, gravida non facilisis eu, rutrum id tortor. Vestibulum ante ipsum primis in 
        faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse tempor dolor in magna placerat suscipit. Duis vel 
        sodales est, id malesuada libero. Morbi condimentum semper dui quis aliquam. Sed eu cursus ex, quis dignissim mauris. 
        Aenean ex odio, ultrices vel libero eu, rutrum cursus tellus.`,
        fecha: "07-07-2023"
      },
    ]
  }

  cargarNoticias(): string {
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

  guardarNoticia(): void {
    console.log(this.newNoticia);
    this.noticias.push(this.newNoticia);
    this.newNoticia = {titulo: "", imagen: "", texto: "", fecha: ""}
  }

}
