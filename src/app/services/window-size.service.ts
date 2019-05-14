import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';

export enum ViewPortSize {
  small = 'small',
  medium = 'medium',
  large = 'large'
}

export interface IConfig {
  medium: number;
  large: number;
}

export class IfViewportSizeConfig implements IConfig {
  constructor(private config: IConfig) {
  }

  get medium() {
    return this.config.medium;
  }

  get large() {
    return this.config.large;
  }
}

@Injectable()

export class WindowSizeService {

  public currentViewportSizeChanged: BehaviorSubject<ViewPortSize>;


  constructor(private config: IfViewportSizeConfig) {
    this.defineViewPortSize();
    window.addEventListener('resize', this.defineViewPortSize.bind(this));
  }

  get currentViewportSize() {
    return this.currentViewportSizeChanged.pipe(distinctUntilChanged());
  }

  private defineViewPortSize() {

    const width = document.body.clientWidth;

    let viewportSize = ViewPortSize.small;
    if (this.config.medium <= width && width < this.config.large) {
      viewportSize = ViewPortSize.medium;
    }
    if (this.config.large <= width) {
      viewportSize = ViewPortSize.large;
    }

    if (!this.currentViewportSizeChanged) {
      this.currentViewportSizeChanged = new BehaviorSubject<ViewPortSize>(viewportSize);
    } else {
      this.currentViewportSizeChanged.next(viewportSize);
    }
  }
}
