class BaseItemUpdater
  def initialize(item)
    @item = item
  end

  def update_properties
    update_quality
    update_sell_in
  end

  private

  def safely_decrease_quality(value)
    value.times { @item.quality -= 1 if can_lower_quality_value? }
  end

  def safely_increase_quality(value)
    value.times { @item.quality += 1 if can_increase_quality_value? }
  end

  def drop_quality
    @item.quality = 0
  end

  def can_increase_quality_value?
    @item.quality < 50
  end

  def can_lower_quality_value?
    @item.quality > 0
  end

  def update_sell_in
    @item.sell_in -= 1
  end

  def update_quality; end
end
