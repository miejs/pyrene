import { scaleBand, scaleLinear } from '@vx/scale';

export default class Utils {

  static scaleLabels(parentSize, labels) {
    return scaleBand({
      rangeRound: [0, parentSize],
      domain: labels,
    });
  }

  static scaleLinear(parentSize, maxValue, direction) {
    return scaleLinear({
      range: direction === 'vertical' ? [parentSize, 0] : [0, parentSize],
      domain: [0, maxValue],
    });
  }

}
