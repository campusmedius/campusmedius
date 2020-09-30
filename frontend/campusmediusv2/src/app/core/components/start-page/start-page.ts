import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Page } from '@app/information/models/page';

@Component({
  selector: 'cm-start-page',
  templateUrl: './start-page.html',
  styleUrls: ['./start-page.scss']
})
export class StartPageComponent implements OnInit {

    public page: Page;

    constructor(
        private translate: TranslateService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
          this.route.data.subscribe(data => {
              this.page = data.pages.find(p => p.titleEn === 'Overview');
          });
    }

    readMore() {
      this.router.navigate(['/about'], { queryParamsHandling: 'merge' });
    }
}
