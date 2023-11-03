import { HomeComponent } from './Pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HcmComponent } from './Pages/hcm/hcm.component';
import { FaturasComponent } from './Pages/h-c-m/faturas/faturas.component';
import { FretesErpComponent } from './Pages/fretes-erp/fretes-erp.component';
import { FaturasErpComponent } from './Pages/faturas-erp/faturas-erp.component';
import { FaturaErpRateioComponent } from './Pages/fatura-erp-rateio/fatura-erp-rateio.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './Pages/cadastros/user/user.component';
import { NavComponent } from './nav/nav.component';
import { CteComponent } from './Pages/cte/cte.component';
import { RateioCcComponent } from './Pages/rateio-cc/rateio-cc.component';

const routes: Routes = [
  {path: 'hcm/faturas', component: FaturasComponent},
  {path: 'hcm/faturas/fatura/:fat', component: HcmComponent},
  {path: 'erp/fretes-erp', component: FretesErpComponent},
  {path: 'erp/faturas-erp', component: FaturasErpComponent},
  {path: 'erp/faturas-erp/fatura/:fat', component: FaturaErpRateioComponent},
  {path: 'import/faturas/:type', component: FaturasErpComponent},
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'cadUsuario', component: UserComponent},
  {path: 'erp/cte', component: CteComponent},
  {path: 'erp/faturas-erp/fatura/rateiocc/:fat/:ccu', component: RateioCcComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
