import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SimonVideoStreamWithStorageComponent } from './simon-video-stream-with-storage.component';

describe('SimonVideoStreamWithStorageComponent', () => {
  let component: SimonVideoStreamWithStorageComponent;
  let fixture: ComponentFixture<SimonVideoStreamWithStorageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimonVideoStreamWithStorageComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SimonVideoStreamWithStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
