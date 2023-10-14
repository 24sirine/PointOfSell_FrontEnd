import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabInvoiceComponent } from './tab-article-invoice.component';

describe('TabInvoiceComponent', () => {
  let component: TabInvoiceComponent;
  let fixture: ComponentFixture<TabInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabInvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
