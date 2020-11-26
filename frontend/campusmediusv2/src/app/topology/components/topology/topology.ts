import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { trigger, transition, animate, style, state } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Mediator } from '@app/topology/models/mediator';
import { Mediation } from '@app/topology/models/mediation';
import { Information } from '@app/information/models/information';
import { Page } from '@app/information/models/page';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { MapComponent } from '../map/map';
import { InfoBoxComponent } from '../info-box/info-box';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CiteDialogComponent } from '@app/information/components/cite-dialog/cite-dialog.component';

const SIDEPANEL_WIDTH = {
    full: '70%',
    short: '470px',
};

@Component({
    selector: 'cm-topology',
    templateUrl: './topology.html',
    styleUrls: ['./topology.scss'],
    animations: [
        trigger('sidenav', [
            state('full', style({ width: SIDEPANEL_WIDTH.full })),
            state('short', style({ width: SIDEPANEL_WIDTH.short })),
            transition('* <=> *', animate('300ms ease-in'))
        ]),
        trigger('mediationsPanel', [
            state('full', style({ width: 'calc(100vw - ' + SIDEPANEL_WIDTH.full + ')' })),
            state('short', style({ width: 'calc(100vw - ' + SIDEPANEL_WIDTH.short + ')' })),
            transition('* <=> *', animate('300ms ease-in'))
        ]),
        trigger('infoBox', [
            state('open', style({ bottom: '240px' })),
            state('closed', style({ bottom: '60px' })),
            transition('* <=> *', animate('300ms ease-in'))
        ]),
        trigger('mapTopOffset', [
            state('open', style({ top: 'calc(-260px + 3.3rem)' })),
            state('closed', style({ top: 'calc(-170px + 3.3rem)' })),
            transition('* <=> *', animate('300ms ease-in'))
        ]),
        trigger('mapLeftOffset', [
            state('full', style({ left: 'calc(-35% - 150px)' })),
            state('short', style({ left: '-385px' })),
            transition('* <=> *', animate('300ms ease-in'))
        ]),
        trigger('titleHeader', [
            state('0', style({ opacity: 0 })),
            state('1', style({ opacity: 1 })),
            transition('0 <=> 1', animate('300ms ease-in'))
        ])
    ]
})
export class TopologyComponent implements OnInit, AfterViewInit, OnDestroy {
    public mediations: Mediation[];
    public selectedMediation: Mediation;
    public focusedMediation: Mediation;
    public previousMediation: Mediation;
    public mediators: Mediator[];
    public visibleMediators: Mediator[];
    public selectedMediator: Mediator;
    public focusedMediator: Mediator;
    public previousMediator: Mediator = null;
    public information: Information;
    public page: Page;

    public lang: string;
    currentLangSubscription: Subscription;

    public sidepanelWidth: string;
    public mediationsHeight = '220px';
    public mobileOverlayHeight = '200px';

    public atGod = false;

    private timer: number;

    sidepanelState = 'short'; // full, short
    mediationState = 'open'; // open, closed
    isMobile = false;

    @ViewChild(MapComponent, {static: false}) map: MapComponent;
    @ViewChild(InfoBoxComponent, {static: false}) infoBox: InfoBoxComponent;      ;

    constructor(
      private translate: TranslateService,
      private route: ActivatedRoute,
      private dialog: MatDialog,
      private router: Router
    ) { }

    ngOnInit() {
        this.sidepanelWidth = SIDEPANEL_WIDTH[this.sidepanelState];


        this.route.data.subscribe(data => {
            this.resetAnimations();

            this.mediations = data.mediations;
            this.selectedMediation = data.selectedMediation;
            this.mediators = data.mediators;
            this.visibleMediators = [];
            this.selectedMediator = data.selectedMediator ? data.selectedMediator : null;

            if (this.selectedMediation !== this.previousMediation) {
                this.previousMediator = null;
            }

            if (this.selectedMediator) {
                if (this.selectedMediator.id === '0') {
                    this.sidepanelState = 'short';
                    if (this.previousMediator) {
                        this.timer = setTimeout(() => {
                            this.atGod = true;
                        }, 4000);
                    } else {
                        this.atGod = true;
                    }
                } else {
                    this.atGod = false;
                    this.visibleMediators = [ this.selectedMediator ];
                }

                this.information = this.selectedMediator.information;
            } else {
                this.sidepanelState = 'short';
                this.page = data.pages.find(p => p.titleEn === 'Topology');
            }

            if (this.map) {
                this.adjustMap();
            }

            this.previousMediator = this.selectedMediator;
            this.previousMediation = this.selectedMediation;
        });

        this.currentLangSubscription = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
            this.lang = event.lang;
        });
    }

    ngAfterViewInit() {
        this.adjustMap();
    }

    resetAnimations() {
      clearTimeout(this.timer);
      if(this.infoBox) {
        this.infoBox.stopAnimation();
      }
      if(this.map) {
        this.map.stopAnimation();
      }
    }

    adjustMap() {
        if (!this.selectedMediator) {
            return;
        }

        this.map.setPerspective(this.selectedMediation);

        if (this.previousMediator && this.previousMediator !== this.selectedMediator) {
            let foundRelation = false;
            this.previousMediator.relationsTo.forEach(r => {
                if (r.targetId === this.selectedMediator.id) {
                    foundRelation = true;
                    this.infoBox.navigateToMediator(this.selectedMediator, r, 'forward');
                    this.map.doNavigation(this.selectedMediation, r.source, this.selectedMediator);
                }
            });
            if (!foundRelation && this.selectedMediation.id === '2') {
                // check for backward relation in examining gaze
                this.selectedMediator.relationsTo.forEach(r => {
                    if (r.sourceId === this.selectedMediator.id) {
                        this.infoBox.navigateToMediator(this.selectedMediator, r, 'backward');
                        this.map.doNavigation(this.selectedMediation, r.source, this.selectedMediator);
                    }
                });
            }
        } else {
            this.map.showMediator(this.selectedMediation, this.selectedMediator);
            this.infoBox.setSpaceTime(this.selectedMediator, 0, 0);
        }
    }

    public toggleInformationPanel() {
        if (this.sidepanelState === 'full') {
            this.sidepanelState = 'short';
            this.sidepanelWidth = SIDEPANEL_WIDTH[this.sidepanelState];
        } else {
            this.sidepanelState = 'full';
            this.sidepanelWidth = SIDEPANEL_WIDTH[this.sidepanelState];
        }
    }

    public readMore() {
      this.router.navigate(['/topology/mediations/1/mediators/0'], { queryParamsHandling: 'merge' });
    }

    public showCite() {
        const dialogRef = this.dialog.open(CiteDialogComponent, {
            width: '800px',
            maxHeight: '90vh',
            data: { event: this.selectedMediator },
            autoFocus: false
        });
    }

    ngOnDestroy() {
        this.currentLangSubscription.unsubscribe();
    }
}
