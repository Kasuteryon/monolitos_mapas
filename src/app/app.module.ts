import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';  // Importación del routing module
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ForestComponent } from './forest/forest.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ForestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule // Agregar aquí
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
