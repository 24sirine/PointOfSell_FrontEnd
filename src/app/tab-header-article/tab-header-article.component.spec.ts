import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabHeaderArticleComponent } from './tab-header-article.component';

describe('TabHeaderArticleComponent', () => {
  let component: TabHeaderArticleComponent;
  let fixture: ComponentFixture<TabHeaderArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabHeaderArticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabHeaderArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
