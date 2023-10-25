import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController, IonCard } from '@ionic/angular';
import type { Animation } from '@ionic/angular';
import { Menu } from 'src/app/models/menu';
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from 'src/app/services/auth-service.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {


  @ViewChild(IonCard, { read: ElementRef })
  card!: ElementRef<HTMLIonCardElement>;

  private animation!: Animation;

  user: any;
  menuArray: Menu[] = [];

  constructor(
    private router: Router,
    private animationCtrl: AnimationController,
    private storage: StorageService,
    private authService: AuthService) { }

  ngOnInit() {
    this.cargarMenu();
    const userEmail = this.authService.getLoggedInUser(); // Obtiene el correo del usuario actual
    if (userEmail) {
      this.storage.obtenerDatosUsuarioActual().then(usuario => {
        if (usuario) {
          this.user = usuario[0]; // Asigna el usuario actual a la variable user
        }
      });
    }
  }


  cargarMenu() {
    this.menuArray.push(
      {
        id: 1,
        icono: "game-controller-outline",
        nombre: "¡Escanea tu clase!",
        url: "/123/menu-uno"
      },
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


  play() {
    this.animation.play();
  }

  pause() {
    this.animation.pause();
  }

  stop() {
    this.animation.stop();
  }


  menuUno() {
    var parametroIdEmpleado = "123456789";
    this.router.navigateByUrl(parametroIdEmpleado + "/menu-uno");
  }

  menuTres() {
    var parametroIdAsignatura = "PGY4121";
    this.router.navigateByUrl(parametroIdAsignatura + "/menu-tres");
  }

  menuCuatro() {
    var nota = 55;
    this.router.navigateByUrl("menu-cuatro/" + nota);
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl("login");
  }


  loadAndConvertPhoto(photoPath: string) {
    // Carga la foto desde la ruta del archivo (photoPath)
    // Convierte la foto a Base64 y asigna el resultado a this.user.photo

    // Ejemplo de cómo cargar y convertir una imagen desde una URL (puede variar según tu configuración)
    const reader = new FileReader();
    fetch(photoPath)
      .then((response) => response.blob())
      .then((blob) => {
        reader.readAsDataURL(blob);
      });
    reader.onloadend = () => {
      // Asigna la imagen convertida en Base64 a this.user.photo
      this.user.photo = reader.result;
    };
  }

}
