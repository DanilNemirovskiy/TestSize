import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {ViewPortSize, WindowSizeService} from '../services/window-size.service';

@Directive({
  selector: '[ifViewportSize]'
})
export class IfViewportSizeDirective implements OnInit {

  private ifViewPortSize: ViewPortSize;

  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef,
              private windowSizeService: WindowSizeService) {
  }

  ngOnInit() {
    this.windowSizeService.currentViewportSize.subscribe(
      (windowSize: ViewPortSize) => {

        if (windowSize === this.ifViewPortSize) {
          this.vcRef.createEmbeddedView(this.templateRef);
        } else {
          this.vcRef.clear();
        }
      });
  }

  @Input()
  set ifViewportSize(size: ViewPortSize) {
    this.ifViewPortSize = size;
  }
}
