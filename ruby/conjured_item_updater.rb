class ConjuredItemUpdater < BaseItemUpdater
  private

  def update_quality
    multiplier = @item.sell_in > 0 ? 2 : 4
    safely_decrease_quality(multiplier)
  end
end
