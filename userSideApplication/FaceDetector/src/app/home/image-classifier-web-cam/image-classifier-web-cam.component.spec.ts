import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImageClassifierWebCamComponent } from './image-classifier-web-cam.component';

describe('ImageClassifierWebCamComponent', () => {
  let component: ImageClassifierWebCamComponent;
  let fixture: ComponentFixture<ImageClassifierWebCamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageClassifierWebCamComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImageClassifierWebCamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
