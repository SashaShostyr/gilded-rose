require_relative 'base_item_updater'

class AgedBrieItemUpdater < BaseItemUpdater
  private

  def update_quality
    multiplier = @item.sell_in > 0 ? 1 : 2
    safely_increase_quality(multiplier)
  end
end
