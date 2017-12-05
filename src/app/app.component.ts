import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title, DomSanitizer } from '@angular/platform-browser';
// import { MatIconRegistry } from '@angular/material';

import { TranslateService } from '@ngx-translate/core';
import { merge } from 'rxjs/observable/merge';
import { filter, map, mergeMap } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { Logger } from './core/logger.service';
import { I18nService } from './core/i18n.service';



const log = new Logger('App');



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private translateService: TranslateService,
    private i18nService: I18nService,
    // private iconRegistry: MatIconRegistry,
    // private sanitizer: DomSanitizer,
  ) {
    // for (const iconName of ['thumbup'])
    // iconRegistry.addSvgIcon(
    //   'thumbs-up',
    //   sanitizer.bypassSecurityTrustResourceUrl('assets/img/examples/thumbup-icon.svg')
    // );
  }

  ngOnInit() {
    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
    }

    log.debug('init');

    // Setup translations
    this.i18nService.init(environment.defaultLanguage, environment.supportedLanguages);

    const onNavigationEnd = this.router.events.pipe(filter(event => event instanceof NavigationEnd));

    // Change page title on navigation or language change, based on route data
    merge(this.translateService.onLangChange, onNavigationEnd)
      .pipe(
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data)
      )
      .subscribe(event => {
        const title = event['title'];
        if (title) {
          this.titleService.setTitle(this.translateService.instant(title));
        }
      });
  }

}
