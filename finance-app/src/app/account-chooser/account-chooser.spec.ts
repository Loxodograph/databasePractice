import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountChooser } from './account-chooser';

describe('AccountChooser', () => {
  let component: AccountChooser;
  let fixture: ComponentFixture<AccountChooser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountChooser],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountChooser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
