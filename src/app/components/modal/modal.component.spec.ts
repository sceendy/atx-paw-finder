import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ModalComponent } from './index';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let modalEl;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModalComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    modalEl = fixture.debugElement;
    fixture.detectChanges();
  });

  it(`should render when SHOW prop is true`, async(() => {
    component.show = true;
    fixture.detectChanges();
    expect(modalEl.query(By.css('.is-active'))).toBeTruthy();
  }));
  it(`should not render when SHOW prop is false`, async(() => {
    component.show = false;
    fixture.detectChanges();
    expect(modalEl.query(By.css('.is-active'))).toBeFalsy();
  }));
  it('should close upon clicking the close button', () => {
    component.show = true;
    spyOn(component, 'closeModal');

    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    fixture.whenStable().then(() => {
      expect(component.closeModal).toHaveBeenCalled();
      expect(modalEl.query(By.css('.is-active'))).toBeFalsy();
    })
  });
});
