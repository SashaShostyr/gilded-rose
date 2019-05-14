require_relative 'aged_brie_item_updater'
require_relative 'backstage_item_updater'
require_relative 'conjured_item_updater'
require_relative 'default_item_updater'
require_relative 'sulfuras_item_updater'

class GildedRoseHelper
  attr_reader :item

  MAP = {
    'Aged Brie'                                 => AgedBrieItemUpdater,
    'Sulfuras, Hand of Ragnaros'                => SulfurasItemUpdater,
    'Backstage passes to a TAFKAL80ETC concert' => BackstageItemUpdater,
    'Conjured Mana Cake'                        => ConjuredItemUpdater
  }.freeze

  def initialize(item)
    @item = item
  end

  def update
    updater.new(item).update_properties
  end

  def self.update(item)
    new(item).update
  end

  private

  def updater
    @updater ||= MAP[@item.name] || DefaultItemUpdater
  end
end
