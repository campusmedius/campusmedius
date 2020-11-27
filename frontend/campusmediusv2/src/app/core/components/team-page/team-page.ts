import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Page } from '@app/information/models/page';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CiteDialogComponent } from '@app/information/components/cite-dialog/cite-dialog.component';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

@Component({
  selector: 'cm-team-page',
  templateUrl: './team-page.html',
  styleUrls: ['./team-page.scss']
})
export class TeamPageComponent implements OnInit {

  public page: Page;

  constructor(
      private translate: TranslateService,
      private route: ActivatedRoute,
      private dialog: MatDialog,
      private router: Router,
      private scrollToService: ScrollToService,
  ) { }


  ngOnInit() {
      this.route.data.subscribe(data => {
          this.page = data.pages.find(p => p.titleEn === 'Team');

          let target = (<any>this.route.fragment).getValue();
          let offset = -100;
          if (!target || target === 'p:1') {
              target = '#info-top';
              offset = 0;
          }
          setTimeout(() => {
          this.scrollToService.scrollTo({
              target: target,
              offset: offset,
              duration: 0
          })}, 50);
      });
  }

  public showCite() {
      const dialogRef = this.dialog.open(CiteDialogComponent, {
          width: '800px',
          maxHeight: '90vh',
          data: { event: this.page },
          autoFocus: false
      });
  }

  public sectionChange(section: string) {
    this.router.navigate( [ ], { fragment: section, queryParams: { }, queryParamsHandling: 'merge', replaceUrl: true } );
  }

}
