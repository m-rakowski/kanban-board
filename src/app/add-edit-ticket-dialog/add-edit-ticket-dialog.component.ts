import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FullTicket } from '../models/ticket';

@Component({
  selector: 'app-add-edit-ticket-dialog',
  templateUrl: './add-edit-ticket-dialog.component.html',
  styleUrls: ['./add-edit-ticket-dialog.component.scss'],
})
export class AddEditTicketDialogComponent implements OnInit {
  title = new FormControl(null, [
    Validators.required,
    Validators.maxLength(512),
  ]);
  content = new FormControl(null, [Validators.required]);
  formGroup: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddEditTicketDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { ticket: FullTicket }
  ) {
    if (data?.ticket) {
      this.title.patchValue(data.ticket.title);
      this.content.patchValue(data.ticket.content);
    }
    this.formGroup = new FormGroup({
      title: this.title,
      content: this.content,
    });
  }

  ngOnInit(): void {}

  saveAndClose() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value);
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
