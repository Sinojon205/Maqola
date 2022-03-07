import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {AlertComponent} from './alert.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {LocaleService} from '@transparent/coretypes';
import {HttpClientModule} from '@angular/common/http';

const mockDialogRef = {
  close: () => null
};

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [AlertComponent],
      providers: [
        LocaleService,
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {
          provide: MatDialogRef, useValue: mockDialogRef
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    spyOn(component, 'onClose').and.callThrough();
    component.onClose();
    expect(component.onClose).toHaveBeenCalled();
  });
});
