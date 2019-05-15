import GildedRoseHelper from "./gilded_rose_helper";

export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      GildedRoseHelper.update(this.items[i]);
    }

    return this.items;
  }
}
