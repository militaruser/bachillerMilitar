import {NgModule} from "@angular/core";
import {APOLLO_OPTIONS, ApolloModule} from "apollo-angular";
import {HttpClientModule} from "@angular/common/http";
import {HttpLink} from "apollo-angular/http";
import {InMemoryCache} from "@apollo/client";
import {environment} from "../environments/environment.development";

@NgModule({
  imports: [ApolloModule, HttpClientModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink)
      {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: environment.apiGraphql
          })
        }
      },
      deps: [HttpLink]
    }
  ]

})
export class ApolloConfigModule {}
