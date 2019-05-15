import BaseItemUpdater from "./base_item_updater";

export default class BackstageItemUpdater extends BaseItemUpdater {
  updateQuality() {
    let multiplier;
    switch (true) {
      case this.item.sellIn > 10:
        multiplier = 1;
        break;
      case this.item.sellIn > 5:
        multiplier = 2;
        break;
      case this.item.sellIn > 0:
        multiplier = 3;
        break;
      case this.item.sellIn === 0:
        this.dropQuality();
        return;
    }
    this.safelyIncreaseQuality(multiplier);
  }
}
