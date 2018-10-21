import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { BackendService } from '../../services/backend.service';
import {AddMemberDialogComponent} from '../../dialogs/add-member-dialog/add-member-dialog.component';
import {RemoveMemberDialogComponent} from '../../dialogs/remove-member-dialog/remove-member-dialog.component';
import {EditTeamDialogComponent} from '../../dialogs/edit-team-dialog/edit-team-dialog.component';
import {CreateTeamDialogComponent} from '../../dialogs/create-team-dialog/create-team-dialog.component';
import {DeleteTeamDialogComponent} from '../../dialogs/delete-team-dialog/delete-team-dialog.component';

@Component({
  selector: 'app-my-teams',
  templateUrl: './my-teams.component.html',
  styleUrls: ['./my-teams.component.scss']
})
export class MyTeamsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;

  displayedColumns: string[] = ['actions', 'name', 'members', 'access-level', 'created', 'updated'];

  constructor(public backendService: BackendService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.initializeDataSource();
  }

  saveTeam(): void {
    const dialogRef = this.dialog.open(CreateTeamDialogComponent, {
      width: '500px',
      height: '550px',
    });
    dialogRef.afterClosed().subscribe((saved) => {
      if (saved) {
        this.initializeDataSource();
      }
    });
  }

  editTeam(team): void {
    const dialogRef = this.dialog.open(EditTeamDialogComponent, {
      width: '500px',
      height: '550px',
      data: team,
    });
    dialogRef.afterClosed().subscribe((edited) => {
      if (edited) {
        this.initializeDataSource();
      }
    });
  }

  addMember(team) {
    const dialogRef = this.dialog.open(AddMemberDialogComponent, {
      width: '500px',
      height: '550px',
      data: team,
    });
    dialogRef.afterClosed().subscribe((r) => {
      if (r) {
        this.initializeDataSource();
      }
    });
  }

  removeMember(team) {
    const dialogRef = this.dialog.open(RemoveMemberDialogComponent, {
      width: '500px',
      height: '550px',
      data: team,
    });
    dialogRef.afterClosed().subscribe((r) => {
      if (r) {
        this.initializeDataSource();
      }
    });
  }

  openDeleteTeamDialog(team) {
    const dialogRef = this.dialog.open(DeleteTeamDialogComponent, {
      width: '500px',
      height: '550px',
      data: team,
    });
    dialogRef.afterClosed().subscribe((deleted) => {
      if (deleted) {
        this.initializeDataSource();
      }
    });
  }

  initializeDataSource() {
    this.backendService.searchTeam(null, (e, r) => {
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
