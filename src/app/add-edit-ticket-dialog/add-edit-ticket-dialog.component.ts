import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-ticket-dialog',
  templateUrl: './add-edit-ticket-dialog.component.html',
  styleUrls: ['./add-edit-ticket-dialog.component.scss'],
})
export class AddEditTicketDialogComponent implements OnInit {
  title = new FormControl();
  content = new FormControl();
  formGroup: FormGroup;

  constructor(private dialogRef: MatDialogRef<AddEditTicketDialogComponent>) {
    this.formGroup = new FormGroup({
      title: this.title,
      content: this.content,
    });
  }

  ngOnInit(): void {}

  saveAndClose() {
    this.dialogRef.close({ ticket: this.formGroup.value });
  }
}
