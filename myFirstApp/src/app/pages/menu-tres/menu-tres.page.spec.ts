import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuTresPage } from './menu-tres.page';

describe('MenuTresPage', () => {
  let component: MenuTresPage;
  let fixture: ComponentFixture<MenuTresPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MenuTresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
