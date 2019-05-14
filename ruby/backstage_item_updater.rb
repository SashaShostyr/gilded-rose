class BackstageItemUpdater < BaseItemUpdater
  private

  def update_quality
    multiplier = case @item.sell_in
                 when 0
                   drop_quality
                   return
                 when 1..5 then 3
                 when 6..10 then 2
                 else 1
                 end
    safely_increase_quality(multiplier)
  end
end
