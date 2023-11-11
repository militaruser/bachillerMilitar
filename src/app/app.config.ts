import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimations} from '@angular/platform-browser/animations';
import {ApolloConfigModule} from "../apollo/apollo-config.module";
import {ToastrModule} from "ngx-toastr";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../environments/environment";
import {getStorage, provideStorage} from "@angular/fire/storage";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(),
    importProvidersFrom(ApolloConfigModule),
    importProvidersFrom(ToastrModule.forRoot()),
    importProvidersFrom(provideFirebaseApp(() => initializeApp(environment.firebaseConfig))),
    importProvidersFrom(provideStorage(() => getStorage()))
  ]
};
