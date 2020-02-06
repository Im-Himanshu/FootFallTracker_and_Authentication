import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TensorFLowJsComponent } from './tensor-flow-js.component';

describe('TensorFLowJsComponent', () => {
  let component: TensorFLowJsComponent;
  let fixture: ComponentFixture<TensorFLowJsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TensorFLowJsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TensorFLowJsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
