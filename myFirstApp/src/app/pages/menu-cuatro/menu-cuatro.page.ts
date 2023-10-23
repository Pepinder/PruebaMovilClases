import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu-cuatro',
  templateUrl: './menu-cuatro.page.html',
  styleUrls: ['./menu-cuatro.page.scss'],
})
export class MenuCuatroPage implements OnInit {

  parametroCalificacion:number = 0;

  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.parametroCalificacion = this.activatedRoute.snapshot.params['calificacion'];
    console.log("Parametro calificación", this.parametroCalificacion);
  }

}
