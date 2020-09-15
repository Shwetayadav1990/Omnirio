import { Component, OnInit } from '@angular/core';
import { DataService } from "../../services/data.service";
import { MatTableDataSource } from '@angular/material/table';
import { AddComponent } from '../add/add.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})



export class ReadComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'sex', 'city', 'deleteAction']; 
  dataSource = new MatTableDataSource<any>();

  constructor(private dataService: DataService, public dialog: MatDialog) {
    this.dataService.getData().subscribe(data => {
      this.dataSource.data = data;
    });
   }

  ngOnInit(): void {
  }


  edit(idx: number, ele: any){
    let dialogRef = this.dialog.open(AddComponent, {
      data:{index: idx, data: ele}
    });
  }

  delete(idx: number){
    this.dataService.deleteData(idx);
  }

}
