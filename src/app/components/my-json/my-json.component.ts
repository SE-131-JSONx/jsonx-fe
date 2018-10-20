import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { BackendService } from '../../services/backend.service';
import {DeleteJsonDialogComponent} from '../../dialogs/delete-json-dialog/delete-json-dialog.component';
import {DataService} from '../../services/data.service';
import {JsonDetails} from '../../util/interfaces';
import {Router} from '@angular/router';

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
              private dialog: MatDialog,
              public dataService: DataService,
              public router: Router) { }

  ngOnInit() {
    this.initializeDataSource();
  }

  viewJson(json): void {
    console.log(json);
    this.dataService.json = <JsonDetails> json;
    this.router.navigateByUrl('/explorer');
  }

  openDeleteJsonDialog(json) {
    const dialogRef = this.dialog.open(DeleteJsonDialogComponent, {
      width: '500px',
      height: '550px',
      data: json,
    });
    dialogRef.afterClosed().subscribe((deleted) => {
      if (deleted) {
        this.initializeDataSource();
      }
    });
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
