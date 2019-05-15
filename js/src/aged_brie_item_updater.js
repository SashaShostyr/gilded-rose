import BaseItemUpdater from "./base_item_updater";

export default class AgedBrieItemUpdater extends BaseItemUpdater {
  updateQuality() {
    const multiplier = this.item.sellIn > 0 ? 1 : 2;
    this.safelyIncreaseQuality(multiplier);
  }
}
