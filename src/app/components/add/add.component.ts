import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  isEdit: boolean = false;
  basicForm = this.fb.group({
    name : new FormControl(''),
    city: new FormControl(''),
    sex: new FormControl('male')
  });

  submitted = false;
  // tslint:disable-next-line: max-line-length
  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private dataService: DataService, private router:Router, private snackBar:MatSnackBar) {
    if(data != null){
      this.isEdit = true;
      this.basicForm.get('name').setValue(data.data.name);
      this.basicForm.get('sex').setValue(data.data.sex);
      this.basicForm.get('city').setValue(data.data.city);
    }
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  onSubmit(){
    this.submitted = true;
    if (this.basicForm.invalid) {
        return;
    }

    if(!this.isEdit){
      this.dataService.addData(this.basicForm.value);
      this.router.navigateByUrl("");
      this.snackBar.open("Record Added", this.basicForm.get('name').value, {
        duration: 2000,
      });
    }
    else{
      this.dataService.updateData(this.basicForm.value, this.data.index);
      this.snackBar.open("Record Edited", this.basicForm.get('name').value, {
        duration: 2000,
      });
    }    
  }

}
