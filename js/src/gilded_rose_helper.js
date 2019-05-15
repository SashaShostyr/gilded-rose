import DefaultItemUpdater from "./default_item_updater";
import AgedBrieItemUpdater from "./aged_brie_item_updater";
import SulfurasItemUpdater from "./sulfuras_item_updater";
import BackstageItemUpdater from "./backstage_item_updater";
import ConjuredItemUpdater from "./conjured_item_updater";

const MAP = {
  "Aged Brie": AgedBrieItemUpdater,
  "Sulfuras, Hand of Ragnaros": SulfurasItemUpdater,
  "Backstage passes to a TAFKAL80ETC concert": BackstageItemUpdater,
  "Conjured Mana Cake": ConjuredItemUpdater
};

export default class GildedRoseHelper {
  constructor(item) {
    this.item = item;
  }

  static update(item) {
    new this(item).update();
  }

  getUpdater() {
    return this.updater || MAP[this.item.name] || DefaultItemUpdater;
  }

  update() {
    new (this.getUpdater())(this.item).updateProperties();
  }
}
