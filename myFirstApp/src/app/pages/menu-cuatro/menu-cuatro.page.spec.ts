import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuCuatroPage } from './menu-cuatro.page';

describe('MenuCuatroPage', () => {
  let component: MenuCuatroPage;
  let fixture: ComponentFixture<MenuCuatroPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MenuCuatroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
