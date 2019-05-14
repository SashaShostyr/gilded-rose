class DefaultItemUpdater < BaseItemUpdater
  private

  def update_quality
    multiplier = @item.sell_in > 0 ? 1 : 2
    safely_decrease_quality(multiplier)
  end
end
