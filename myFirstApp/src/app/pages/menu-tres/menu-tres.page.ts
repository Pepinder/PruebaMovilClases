import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu-tres',
  templateUrl: './menu-tres.page.html',
  styleUrls: ['./menu-tres.page.scss'],
})
export class MenuTresPage implements OnInit {
  parametroIdAsignatura:string | undefined;
  constructor(private activatedRoute:ActivatedRoute) { } 

  ngOnInit() {
    this.parametroIdAsignatura = this.activatedRoute.snapshot.params['asignaturaId'];
    console.log("Parametro",this.parametroIdAsignatura);
  }

}
