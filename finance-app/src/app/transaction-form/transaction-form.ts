import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-transaction-form',
  imports: [ReactiveFormsModule],
  templateUrl: './transaction-form.html',
  styleUrl: './transaction-form.css',
})
export class TransactionForm {
  transactionForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.transactionForm = this.fb.group({
      amount: [''],
      description: [''],
      category: ['']
    });
  }
  
  onSubmit() {
    if (this.transactionForm.valid) {
      const formData = this.transactionForm.value;

      this.http.post('https://opulent-space-meme-4wj9xw4jg693g4-5001.app.github.dev/transactions', formData)
        .subscribe({
          next: (response) => console.log("Success!", response),
          error: (error) => console.error("Error!", error)
        })
    }
  }

}
