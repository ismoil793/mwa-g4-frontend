import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFilter',
})
export class PriceFilterPipe implements PipeTransform {
  transform(
    values: any[],
    params: { min: number; max: number } = { min: 0, max: 0 },
    ...args: unknown[]
  ): any[] {
    const { min, max } = params;
    if (max <= min || max == 0) {
      return values;
    }
    // console.log(values.filter((v) => min <= v.price && max <= v.price));
    return values.filter((v) => {
      console.log(v, min, max, min <= v.price && max >= v.price);
      return min <= v.price && max >= v.price;
    });
  }
}
