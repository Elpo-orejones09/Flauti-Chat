import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AuthService } from './services/auth.service';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, AuthService, provideFirebaseApp(() => initializeApp({"projectId":"flauti-chat","appId":"1:71228493507:web:5c010d94c37d57e62b9c76","databaseURL":"https://flauti-chat-default-rtdb.europe-west1.firebasedatabase.app","storageBucket":"flauti-chat.appspot.com","apiKey":"AIzaSyDafhFR7waF8lsv0nynPsHR77KPQ4gIuTE","authDomain":"flauti-chat.firebaseapp.com","messagingSenderId":"71228493507","measurementId":"G-DGE79KQPRV"})), provideAuth(() => getAuth()), provideStorage(() => getStorage())],
  bootstrap: [AppComponent],
})
export class AppModule {}
