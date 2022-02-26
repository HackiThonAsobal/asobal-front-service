import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpinnerComponent } from './spinner.component';
describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpinnerComponent]
    });
    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
