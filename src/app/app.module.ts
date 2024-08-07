import { PowerBiComponent } from './Pages/power-bi/power-bi.component';
import { Input, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header_inativo/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import { HcmComponent } from './Pages/hcm/hcm.component';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MessagesComponent } from './messages/messages.component';
import { FaturasComponent } from './Pages/h-c-m/faturas/faturas.component';
import { FretesErpComponent } from './Pages/fretes-erp/fretes-erp.component';
import { FaturasErpComponent } from './Pages/faturas-erp/faturas-erp.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormFileFatComponent } from './Pages/form-file-fat/form-file-fat.component';
import { FaturaErpRateioComponent } from './Pages/fatura-erp-rateio/fatura-erp-rateio.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './Pages/home/home.component';
import { UserComponent } from './Pages/cadastros/user/user.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { CteComponent } from './Pages/cte/cte.component';
import { RateioCcComponent } from './Pages/rateio-cc/rateio-cc.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { FormDocantComponent } from './form-docant/form-docant.component';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { RelatorioRateioComponent } from './Pages/relatorio-rateio/relatorio-rateio.component';
import { ProtectedComponent } from './Pages/protected/protected.component';
import { SchenkerComponent } from './Pages/schenker/schenker.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HcmComponent,
    MessagesComponent,
    FaturasComponent,
    FaturasErpComponent,
    FormFileFatComponent,
    FretesErpComponent,
    FaturaErpRateioComponent,
    LoginComponent,
    HomeComponent,
    UserComponent,
    CteComponent,
    RateioCcComponent,
    NavComponent,
    FormDocantComponent,
    PowerBiComponent,
    RelatorioRateioComponent,
    ProtectedComponent,
    SchenkerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatTableModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    CommonModule,
    NgOptimizedImage,
    MatDialogModule,
    MatSelectModule,
    MatPaginatorModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
