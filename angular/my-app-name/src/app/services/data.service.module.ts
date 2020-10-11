import { NgModule } from "@angular/core";
import { TranslateModule , TranslateLoader } from "@ngx-translate/core";
import { CookieService } from "ngx-cookie-service";
import { TranslationService ,CustomTranslateLoaderFactory } from "./data.service";

@NgModule({
  imports: [
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: CustomTranslateLoaderFactory,
        deps: [
          TranslationService
        ]
      }
    })
  ],
  providers: [
    CookieService
  ],
  exports: [
    TranslateModule
  ]
})
export class TranslationModule {
}