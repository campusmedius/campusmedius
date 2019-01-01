import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'cm-app',
    templateUrl: './app.html',
    styleUrls: ['./app.scss']
})
export class AppComponent implements OnInit {

    public isSafari = false;

    constructor(
        private translate: TranslateService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

        this.translate.addLangs(['en', 'de']);
        translate.setDefaultLang('de');

        let setLangTo = null;
        if (this.route.snapshot.queryParams['lang'] && this.route.snapshot.queryParams['lang'].match(/en|de/)) {
            setLangTo = this.route.snapshot.queryParams['lang'];
        }

        if (!setLangTo) {
            if (translate.getBrowserLang().match(/en|de/)) {
                setLangTo = translate.getBrowserLang();
            }
        }

        setLangTo = setLangTo ? setLangTo : 'en';
        this.translate.use(setLangTo);
    }

    ngOnInit() {
        this.route.queryParams.subscribe(queryParams => {
            if (queryParams['lang'] && queryParams['lang'].match(/en|de/)) {
                this.translate.use(queryParams['lang']);
            }
        });
    }
}
