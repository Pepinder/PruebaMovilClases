import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController, IonCard } from '@ionic/angular';
import type { Animation } from '@ionic/angular';
import { Menu } from 'src/app/models/menu';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {


  @ViewChild(IonCard, { read: ElementRef })
  card!: ElementRef<HTMLIonCardElement>;

  private animation!: Animation;


  menuArray:Menu[]=[];

  constructor(
              private router:Router, 
              private animationCtrl: AnimationController,
              private storage:StorageService) { }

  ngOnInit() {
    this.cargarMenu();
    //console.log("MENU", this.menuArray);
    console.table(this.menuArray);
    console.error("Mi primer erorr en TS");
    console.warn("Mi primera advertencia en TS");
    this.cargarUsuarios();
    console.log("Componente cargado");
  }


  ionViewWillEnter(){
    console.log("Cargando la vista");
  }
  ionViewDidEnter(){
    console.log("Vista cargada");
  }
  ionViewWillLeave(){
    console.log("Abandonar la vista ");
  }
  ionViewDidLeave(){
    console.log("ya abandonamos la vista");    
  }




  async cargarUsuarios(){
    console.log("USUARIOS GUARDADOS EN STORAGE",await this.storage.obtenerUsuario());
  }

  cargarMenu(){
    this.menuArray.push(
      {
        id:1,
        icono:"game-controller-outline",
        nombre:"Menú uno",
        url:"/123/menu-uno"
      },
      {
        id:2,
        icono:"heart-half-outline",
        nombre:"Menú dos",
        url:"/menu-dos"
      }
    )
  }
  

  

  ngAfterViewInit() {
    this.animation = this.animationCtrl
      .create()
      .addElement(document.querySelectorAll("ion-card"))
      .duration(1500)
      .iterations(Infinity)
      .fromTo('transform', 'translateX(0px)', 'translateX(100px)')
      .fromTo('opacity', '1', '0.2');
  }


  play(){
    this.animation.play();
  }

  pause(){
    this.animation.pause();
  }

  stop(){
    this.animation.stop();
  }


  menuUno(){
    var parametroIdEmpleado = "123456789";
    this.router.navigateByUrl(parametroIdEmpleado + "/menu-uno");
  }

  menuTres(){
    var parametroIdAsignatura = "PGY4121";
    this.router.navigateByUrl(parametroIdAsignatura + "/menu-tres");
  }

  menuCuatro(){
    var nota = 55;
    this.router.navigateByUrl("menu-cuatro/" + nota);
  }

  logout(){
    this.router.navigateByUrl("login");
  }


}
