import { Component, OnInit, Input, Output, EventEmitter, ElementRef, OnChanges, ViewChild } from '@angular/core';
import { InformationMedia } from '../../models/information';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { InformationComponent } from '../information/information.component';

@Component({
  selector: 'cm-info-container',
  templateUrl: './info-container.html',
  styleUrls: ['./info-container.scss']
})
export class InfoContainerComponent implements OnInit, OnChanges {

  @Input() title: string;
  @Input() subTitle: string;
  @Input() hideSubTitle = false;
  @Input() abstract: string;
  @Input() lang: string;
  @Input() content: string;
  @Input() media: InformationMedia;
  @Input() state: string = 'short';
  @Input() readMoreText: string = 'START';
  @Input() hideReadMoreText = false;

  @Output() moreClick = new EventEmitter();
  @Output() citeClick = new EventEmitter();
  @Output() sectionChange = new EventEmitter<string>();

  @ViewChild(InformationComponent, {static: false}) information: InformationComponent;

  private spiedElements;
  private parentElement;
  private currentSection: string;

  constructor(
    private element: ElementRef,
    private scrollToService: ScrollToService,
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    setTimeout(() => {
      this.parentElement = this.element.nativeElement.children[0];
      this.spiedElements = this.element.nativeElement.querySelectorAll('.info-content > div > cm-information > div > p');
      this.onScroll();
      this.sectionChange.emit(this.currentSection);
    }, 50);
  }

  public onScroll() {
      let currentSection: string;
      const scrollTop = this.parentElement.scrollTop;
      const parentOffset = this.parentElement.offsetTop;
      for (let i = 0; i < this.spiedElements.length; i++) {
          const element = this.spiedElements[i];
          if ((element.offsetTop - parentOffset) <= (scrollTop + 200)) {
              currentSection = element.id;
          }
      }
      if (currentSection !== this.currentSection) {
          this.currentSection = currentSection;
          this.sectionChange.emit(this.currentSection);
      }
  }

  public scrollToReference(ref: string) {
    if (ref === 'top' || ref === 'p:1') {
        ref = '#info-top';
    }
    setTimeout(() => {
      this.information.openComponentByRef(ref);
      this.scrollToService.scrollTo({
          target: ref,
          offset: -100,
          duration: 0
      });
    }, 0);
  }

}
