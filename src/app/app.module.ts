import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule, MatTreeModule
} from '@angular/material';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
import { EditUserDialogComponent } from './dialogs/edit-user-dialog/edit-user-dialog.component';
import { ExplorerComponent } from './components/explorer/explorer.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { MyJsonComponent } from './components/my-json/my-json.component';
import { MyTeamsComponent } from './components/my-teams/my-teams.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { AccessLevelPipe } from './pipes/access-level.pipe';
import { DeleteJsonDialogComponent } from './dialogs/delete-json-dialog/delete-json-dialog.component';
import { SaveJsonDialogComponent } from './dialogs/save-json-dialog/save-json-dialog.component';
import { UpdateJsonDialogComponent } from './dialogs/update-json-dialog/update-json-dialog.component';
import {AuthInterceptorService} from './services/auth-interceptor.service';
import {BackendService} from './services/backend.service';
import { AddMemberDialogComponent } from './dialogs/add-member-dialog/add-member-dialog.component';
import { RemoveMemberDialogComponent } from './dialogs/remove-member-dialog/remove-member-dialog.component';
import { EditTeamDialogComponent } from './dialogs/edit-team-dialog/edit-team-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    SignupComponent,
    MyprofileComponent,
    EditUserDialogComponent,
    ExplorerComponent,
    MyJsonComponent,
    MyTeamsComponent,
    TruncatePipe,
    AccessLevelPipe,
    DeleteJsonDialogComponent,
    SaveJsonDialogComponent,
    UpdateJsonDialogComponent,
    AddMemberDialogComponent,
    RemoveMemberDialogComponent,
    EditTeamDialogComponent
  ],
  entryComponents: [
    EditUserDialogComponent,
    DeleteJsonDialogComponent,
    SaveJsonDialogComponent,
    UpdateJsonDialogComponent,
    AddMemberDialogComponent,
    RemoveMemberDialogComponent,
    EditTeamDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    NgxJsonViewerModule,
    MonacoEditorModule.forRoot(),
  ],
  providers: [
    BackendService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
