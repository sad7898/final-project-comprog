import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Searche } from './search.page';

describe('Searche', () => {
  let component: Searche;
  let fixture: ComponentFixture<Searche>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Searche],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(Searche);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
