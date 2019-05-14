require File.join(File.dirname(__FILE__), 'gilded_rose')

describe GildedRose do

  describe "#update_quality" do
    shared_examples 'default name value' do |item_name|
      it "does not change the name" do
        item = Item.new(item_name, sell_in = 0, quality = 0)
        items = [item]
        gilded_rose = described_class.new(items)
        gilded_rose.update_quality
        expect(item.name).to eq item_name
      end
    end

    shared_examples 'default sell_in value' do |item_name|
      it 'lowers sell_in value by 1 at the end of the day' do
        item = Item.new(item_name, sell_in = 1, quality = 0)
        items = [item]
        gilded_rose = described_class.new(items)
        gilded_rose.update_quality

        expect(item.sell_in).to eq 0
      end

      it 'lowers sell in value by N after N days' do
        n = 3
        item = Item.new(item_name, sell_in = n, quality = 0)
        items = [item]
        gilded_rose = described_class.new(items)

        n.times do |i|
          gilded_rose.update_quality
          expect(item.sell_in).to eq (n - (i + 1))
        end

        expect(item.sell_in).to eq 0
      end

    end

    shared_examples 'default quality value' do |item_name|
      it 'is never negative' do
        item = Item.new(item_name, sell_in = 0, quality = 0)
        item2 = Item.new(item_name, sell_in = 0, quality = 1)
        items = [item, item2]
        gilded_rose = described_class.new(items)
        gilded_rose.update_quality

        expect(item.quality).to eq 0
        expect(item2.quality).to eq 0
      end

      it 'is never more than 50' do
        item = Item.new(item_name, sell_in = 1, quality = 50)
        items = [item]
        gilded_rose = described_class.new(items)
        gilded_rose.update_quality

        expect(item.quality).to be <= 50
      end
    end

    context 'Default item' do
      context 'item name' do
        it_behaves_like 'default name value', item_name = 'foo'
      end

      context 'item sell_in' do
        it_behaves_like 'default sell_in value', item_name = 'foo'
      end

      context 'item quality' do
        it_behaves_like 'default quality value', item_name = 'foo'

        context 'when sell_in date not passed yet' do
          it 'lowers quality value by 1 at the end of the day' do
            item = Item.new('foo', sell_in = 1, quality = 1)
            items = [item]
            gilded_rose = described_class.new(items)
            gilded_rose.update_quality

            expect(item.quality).to eq 0
          end

          it 'lowers quality value by N after N days' do
            n = 3
            item = Item.new('foo', sell_in = n, quality = n)
            items = [item]
            gilded_rose = described_class.new(items)

            n.times do |i|
              gilded_rose.update_quality
              expect(item.quality).to eq (n - (i + 1))
            end

            expect(item.quality).to eq 0
          end
        end

        context 'when sell in date has passed' do
          it 'lowers quality value by 2 at the end of the day' do
            item = Item.new('foo', sell_in = 0, quality = 4)
            items = [item]
            gilded_rose = described_class.new(items)
            gilded_rose.update_quality

            expect(item.quality).to eq 2
          end

          it 'lowers quality value twice as fast after N days' do
            n = 5
            quality = 15
            item = Item.new('foo', sell_in = 0, quality = quality)
            items = [item]
            gilded_rose = described_class.new(items)

            n.times do |i|
              gilded_rose.update_quality
              expect(item.quality).to eq (quality - (2 * (i + 1)))
            end

            expect(item.quality).to eq 5
          end
        end
      end
    end

    context 'Aged Brie item' do
      context 'item name' do
        it_behaves_like 'default name value', item_name = 'Aged Brie'
      end

      context 'item sell_in' do
        it_behaves_like 'default sell_in value', item_name = 'Aged Brie'
      end

      context 'item quality' do
        context 'when sell in date not passed yet' do
          it 'increases by 1 the older it gets' do
            n = 5
            item = Item.new('Aged Brie', sell_in = n, quality = 0)
            items = [item]
            gilded_rose = described_class.new(items)

            n.times do |i|
              gilded_rose.update_quality
              expect(item.quality).to eq (i + 1)
            end

            expect(item.quality).to eq n
          end
        end

        context 'when sell in date has passed' do
          it 'increases twice as fast the older it gets' do
            n = 5
            item = Item.new('Aged Brie', sell_in = 0, quality = 0)
            items = [item]
            gilded_rose = described_class.new(items)

            n.times do |i|
              gilded_rose.update_quality
              expect(item.quality).to eq (2 * (i + 1))
            end

            expect(item.quality).to eq (2 * n)
          end
        end

        it 'is never more than 50' do
          n = 2
          item = Item.new('Aged Brie', sell_in = n, quality = 49)
          items = [item]
          gilded_rose = described_class.new(items)

          n.times do
            gilded_rose.update_quality
          end

          expect(item.quality).to eq 50
        end
      end
    end

    context 'Sulfuras item' do
      context 'item name' do
        it_behaves_like 'default name value', item_name = 'Sulfuras, Hand of Ragnaros'
      end

      context 'item sell_in' do
        it 'does not change the sell in' do
          item = Item.new('Sulfuras, Hand of Ragnaros', sell_in = 2, quality = 80)
          items = [item]
          gilded_rose = described_class.new(items)
          gilded_rose.update_quality

          expect(item.sell_in).to eql 2
        end
      end

      context 'item quality' do
        it 'does not change the quality and always equals to 80' do
          item = Item.new('Sulfuras, Hand of Ragnaros', sell_in = 0, quality = 80)
          items = [item]
          gilded_rose = described_class.new(items)
          gilded_rose.update_quality

          expect(item.quality).to eql 80
        end
      end
    end

    context 'Backstage passes to a TAFKAL80ETC concert item' do
      context 'item name' do
        it_behaves_like 'default name value', item_name = 'Backstage passes to a TAFKAL80ETC concert'
      end

      context 'item sell_in' do
        it_behaves_like 'default sell_in value', item_name = 'Backstage passes to a TAFKAL80ETC concert'
      end

      context 'item quality' do
        context 'when sell in date not passed yet' do
          context 'when sell in above 10 days' do
            it 'increases by 1 the older it gets' do
              n = 5
              quality = 1
              item = Item.new('Backstage passes to a TAFKAL80ETC concert', sell_in = 15, quality = quality)
              items = [item]
              gilded_rose = described_class.new(items)

              n.times do |i|
                gilded_rose.update_quality
                expect(item.quality).to eq (quality + i + 1)
              end

              expect(item.quality).to eq (quality + n)
            end

            it 'increases to 50 when sell_in above 10 and quality is 49' do
              item = Item.new('Backstage passes to a TAFKAL80ETC concert', sell_in = 15, quality = 49)
              items = [item]
              gilded_rose = described_class.new(items)
              gilded_rose.update_quality

              expect(item.quality).to eq 50
            end
          end

          context 'when sell in 10 days or less and above 5 days' do
            it 'increases by 2 the older it gets' do
              n = 5
              quality = 1
              item = Item.new('Backstage passes to a TAFKAL80ETC concert', sell_in = 10, quality = quality)
              items = [item]
              gilded_rose = described_class.new(items)

              n.times do |i|
                gilded_rose.update_quality
                expect(item.quality).to eq (quality + 2 * (i + 1))
              end

              expect(item.quality).to eq (quality + (2 * n))
            end

            it 'increases to 50 instead of 51 when sell_in is 6 and quality is 49' do
              item = Item.new('Backstage passes to a TAFKAL80ETC concert', sell_in = 6, quality = 49)
              items = [item]
              gilded_rose = described_class.new(items)
              gilded_rose.update_quality

              expect(item.quality).to eq 50
            end
          end

          context 'when sell in 5 days or less' do
            it 'increases by 3 the older it gets' do
              n = 5
              quality = 1
              item = Item.new('Backstage passes to a TAFKAL80ETC concert', sell_in = 5, quality = quality)
              items = [item]
              gilded_rose = described_class.new(items)

              n.times do |i|
                gilded_rose.update_quality
                expect(item.quality).to eq (quality + 3 * (i + 1))
              end

              expect(item.quality).to eq (quality + (3 * n))
            end

            it 'increases to 50 instead of 52 when sell_in is 1 and quality is 49' do
              item = Item.new('Backstage passes to a TAFKAL80ETC concert', sell_in = 1, quality = 49)
              items = [item]
              gilded_rose = described_class.new(items)
              gilded_rose.update_quality

              expect(item.quality).to eq 50
            end
          end
        end

        context 'when sell in date has passed' do
          it 'drops to 0 after the concert' do
            item = Item.new('Backstage passes to a TAFKAL80ETC concert', sell_in = 0, quality = 5)
            items = [item]
            gilded_rose = described_class.new(items)
            gilded_rose.update_quality

            expect(item.quality).to eq 0
          end
        end
      end
    end

    context 'Conjured item' do
      context 'item name' do
        it_behaves_like 'default name value', item_name = 'Conjured Mana Cake'
      end

      context 'item sell_in' do
        it_behaves_like 'default sell_in value', item_name = 'Conjured Mana Cake'
      end

      context 'item quality' do
        it_behaves_like 'default quality value', item_name = 'Conjured Mana Cake'

        it 'lowers quality value by 2 at the end of the day' do
          item = Item.new('Conjured Mana Cake', sell_in = 1, quality = 2)
          items = [item]
          gilded_rose = described_class.new(items)
          gilded_rose.update_quality

          expect(item.quality).to eq 0
        end

        it 'lowers quality value twice as fast after N days' do
          quality = 15
          item = Item.new('Conjured Mana Cake', sell_in = 1, quality = quality)
          items = [item]
          gilded_rose = described_class.new(items)

          # lowers quality value by 2
          gilded_rose.update_quality
          expect(item.quality).to eq (13)

          # lowers quality value by 4 because sell_in has passed
          gilded_rose.update_quality
          expect(item.quality).to eq (9)

          gilded_rose.update_quality
          expect(item.quality).to eq (5)
        end
      end
    end
  end
end
