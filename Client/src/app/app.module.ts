import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertComponent } from './components/alert/alert.component';
import { FileEffects } from './store/effects/file.effect';
import { storeReducer } from './store/reducers/reducer';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ state : storeReducer }),
    EffectsModule.forRoot([FileEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
