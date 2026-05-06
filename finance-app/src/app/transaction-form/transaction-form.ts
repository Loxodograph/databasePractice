import { Component, signal, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-transaction-form',
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './transaction-form.html',
  styleUrl: './transaction-form.css',
})
export class TransactionForm implements OnInit {
  transactionForm: FormGroup;
  public transactions = signal<any[]>([]);
  public categories = signal<any[]>([]);

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.transactionForm = this.fb.group({
      amount: [''],
      description: [''],
      categoryId: ['1']
    });
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      const formData = {
        ...this.transactionForm.value,
        accountId: 1
      };
      this.http.post(`${environment.apiUrl}/transactions`, formData)
        .subscribe({
          next: (response) => {
            console.log("Success!", response);
            this.transactionList();
            this.transactionForm.reset({ amount: '', description: '', categoryId: '1' });
          },
          error: (error) => console.error("Error!", error),
        })
    }
  }

  transactionList() {
    this.http.get<any[]>(`${environment.apiUrl}/transactions`)
      .subscribe((response) => {
        const formatted = response.map(t => ({
          ...t,
          date: new Date(t.date).toDateString(),
          amount: Number(t.amount).toFixed(2)
        }));

        this.transactions.set(formatted);
      });

  }

  translateCategoryId() {
    this.http.get<any[]>(`${environment.apiUrl}/categories`)
      .subscribe((response) => {
        this.categories.set(response);
      });
  }

  deleteTransaction(id: number) {
    this.http.delete(`${environment.apiUrl}/transactions/${id}`)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.transactions.update(prev => prev.filter(t => t.id !== id));
        }
      });
  }

  ngOnInit() {
    this.translateCategoryId();
    this.transactionList();
  }
}
