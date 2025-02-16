import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AmigosRescatadosRoutingModule } from './amigos-rescatados-routing.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule, AmigosRescatadosRoutingModule],
  providers: [provideHttpClient(withInterceptors([]))],
})
export class AmigosRescatadosModule {}
