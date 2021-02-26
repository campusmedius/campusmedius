import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
    selector: 'cm-cite-dialog',
    templateUrl: './cite-dialog.component.html',
    styleUrls: ['./cite-dialog.component.scss']
})
export class CiteDialogComponent implements OnInit {
    public titleDe: string;
    public titleEn: string;
    public publishedDe: string;
    public publishedEn: string;
    public updatedDe: string;
    public updatedEn: string;
    public keywordsEn: string;
    public keywordsDe: string;
    public keywordsShortEn: string;
    public keywordsShortDe: string;
    public keywordsExpanded = false;
    public keywordsShowExpanded = true;
    public url: string;

    constructor(
        public translate: TranslateService,
        private dialogRef: MatDialogRef<CiteDialogComponent>,
        private clipboard: Clipboard,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        if (this.data.type === 'event') {
            this.url = 'https://campusmedius.net/topography/events/' + this.data.data.id + '?lang=' + this.translate.currentLang + '&info=full';
        } else if (this.data.type === 'mediator') {
            this.url = 'https://campusmedius.net/topology/mediations/' + this.data.mediationId + '/mediators/' + this.data.data.id + '?lang=' + this.translate.currentLang + '&info=full';
        } else if (this.data.type === 'page') {
            this.url = 'https://campusmedius.net';
            if(this.data.data.titleEn === 'Overview') {
                this.url += '/overview';
            } else if(this.data.data.titleEn === 'Project Team') {
                this.url += '/team';
            } else if(this.data.data.titleEn === 'Book Edition') {
                this.url += '/book';
            }
            this.url += '?lang=' + this.translate.currentLang;
        } else {
            this.url = 'https://campusmedius.net';
        }

        this.titleEn = this.data.data.titleEn.replaceAll('"', '');
        this.titleDe = this.data.data.titleDe.replaceAll('"', '');

        this.publishedDe = this.data.data.created.format('D. MMMM YYYY');
        this.publishedEn = this.data.data.created.format('MMMM D, YYYY');
        this.updatedDe = this.data.data.updated.format('D. MMMM YYYY');
        this.updatedEn = this.data.data.updated.format('MMMM D, YYYY');

        this.keywordsEn = this.data.data.keywordsEn.join(', ');
        this.keywordsDe = this.data.data.keywordsDe.join(', ');
        if (this.keywordsEn.length > 60) {
            this.keywordsShortEn = this.keywordsEn.substr(0, 60) + ' ...';
            this.keywordsShowExpanded = true;
        } else {
            this.keywordsShortEn = this.keywordsEn;
            this.keywordsShowExpanded = false;
        }
        if (this.keywordsDe.length > 60) {
            this.keywordsShortDe = this.keywordsDe.substr(0, 60) + ' ...';
            this.keywordsShowExpanded = true;
        } else {
            this.keywordsShortDe = this.keywordsDe;
            this.keywordsShowExpanded = false;
        }

    }

    public close() {
        this.dialogRef.close();
    }

    public copyUrl() {
        this.clipboard.copy(this.url);
    }
    public copyCitation() {
        let citation;
        if (this.translate.currentLang === 'en') {
            citation = 'Simon Ganahl et al.: "' + this.titleEn + '", last updated on ' + this.updatedEn + ', in: Campus Medius, 2014–2021, URL: ' + this.url;
        } else {
            citation = 'Simon Ganahl u.a.: "' + this.titleDe + '", zuletzt aktualisiert am ' + this.updatedDe + ', in: Campus Medius, 2014–2021, URL: ' + this.url;
        }
        this.clipboard.copy(citation);
    }
}