import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-my-json',
  templateUrl: './my-json.component.html',
  styleUrls: ['./my-json.component.scss']
})
export class MyJsonComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;

  displayedColumns: string[] = ['actions', 'title', 'data', 'size', 'created', 'updated'];

  constructor(public backendService: BackendService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.initializeDataSource();
  }

  viewJson(json): void {
    /*const dialogRef = this.dialog.open(EditJsonDialogComponent, {
      width: '500px',
      height: '550px',
      data: json,
    });
    dialogRef.afterClosed().subscribe((edited) => {
      if (edited) {
        this.initializeDataSource();
      }
    });*/
  }

  openDeleteJsonDialog(json) {
    /*const dialogRef = this.dialog.open(DeleteJsonDialogComponent, {
      width: '500px',
      height: '550px',
      data: organization,
    });
    dialogRef.afterClosed().subscribe((deleted) => {
      if (deleted) {
        this.initializeDataSource();
      }
    });*/
  }

  initializeDataSource() {
    this.backendService.searchJson(null, (e, r) => {
      this.dataSource = new MatTableDataSource(r);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
