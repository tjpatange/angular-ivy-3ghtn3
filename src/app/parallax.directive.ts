import {
  Directive,
  Input,
  ElementRef,
  HostListener
} from "@angular/core";

@Directive({
  selector: "[appParallax]"
})
export class ParallaxDirective {
  @Input("ratio") parallaxRatio: number = 0;
  @Input("iniVal") parallaxInitial: number = 0;
  @Input("css") parallaxCss: string = "";
  cssKey: string = '';
  cssValue: string = '';
  isSpecialVal;
  pCssVal: string = '';
  pOffset;
  pRatio;
  pInitVal;
  cssValArray: string[];

  initialTop: number = 0;

  constructor(private eleRef: ElementRef) {
    this.pCssVal = this.parallaxCss ? this.parallaxCss : "top";
    this.cssValArray = this.pCssVal.split(":");
    this.cssKey = this.cssValArray[0];
    this.cssValue = this.cssValArray[1];

    this.isSpecialVal = this.cssValue ? true : false;
    if (!this.cssValue) {
      this.cssValue = this.cssKey;
    }

    this.pRatio = this.parallaxRatio ? +this.parallaxRatio : 1.1;
    this.pInitVal = this.parallaxInitial ? +this.parallaxInitial : 0;

    this.eleRef.nativeElement.this.eleRef.nativeElement.style[this.cssKey] =
      this.pInitVal + "px";
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll(event) {
    this.eleRef.nativeElement.style[this.cssKey] = this.pInitVal + "px";
  }
}
