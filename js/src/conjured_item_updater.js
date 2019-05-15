import BaseItemUpdater from "./base_item_updater";

export default class ConjuredItemUpdater extends BaseItemUpdater {
  updateQuality() {
    const multiplier = this.item.sellIn > 0 ? 2 : 4;
    this.safelyDecreaseQuality(multiplier);
  }
}
