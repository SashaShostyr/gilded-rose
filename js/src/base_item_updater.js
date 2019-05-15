export default class BaseItemUpdater {
  constructor(item) {
    this.item = item;
  }

  canDecreaseQualityValue() {
    return this.item.quality > 0;
  }

  canIncreaseQualityValue() {
    return this.item.quality < 50;
  }

  safelyDecreaseQuality(value) {
    for (let i = 0; i < value; i++) {
      if (this.canDecreaseQualityValue()) {
        this.item.quality -= 1;
      }
    }
  }

  safelyIncreaseQuality(value) {
    for (let i = 0; i < value; i++) {
      if (this.canIncreaseQualityValue()) {
        this.item.quality += 1;
      }
    }
  }

  dropQuality() {
    this.item.quality = 0;
  }

  updateQuality() {}

  updateSellIn() {
    this.item.sellIn -= 1;
  }

  updateProperties() {
    this.updateQuality();
    this.updateSellIn();
  }
}
