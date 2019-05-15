var { Shop, Item } = require("../src/gilded_rose.js");

function sharedBehaviorForNameValue(itemName) {
  describe("(default name value)", function() {
    it("does not change the name", function() {
      const item = new Item(itemName, 0, 0);
      const items = [item];
      const gildedRose = new Shop(items);
      gildedRose.updateQuality();

      expect(item.name).toEqual(itemName);
    });
  });
}

function sharedBehaviorForSellInValue(itemName) {
  describe("(default name value)", function() {
    it("lowers sellIn value by 1 at the end of the day", function() {
      const item = new Item(itemName, 1, 0);
      const items = [item];
      const gildedRose = new Shop(items);
      gildedRose.updateQuality();

      expect(item.sellIn).toEqual(0);
    });

    it("lowers sellIn value by N after N days", function() {
      const n = 3;
      const item = new Item(itemName, n, 0);
      const items = [item];
      const gildedRose = new Shop(items);

      for (let i = 0; i < n; i++) {
        gildedRose.updateQuality();
        expect(item.sellIn).toEqual(n - (i + 1));
      }

      expect(item.sellIn).toEqual(0);
    });
  });
}

function sharedBehaviorForQualityValue(itemName) {
  describe("(default name value)", function() {
    it("is never negative", function() {
      const item = new Item(itemName, 0, 0);
      const item2 = new Item(itemName, 0, 1);
      const items = [item, item2];
      const gildedRose = new Shop(items);
      gildedRose.updateQuality();

      expect(item.quality).toEqual(0);
      expect(item2.quality).toEqual(0);
    });

    it("is never more than 50", function() {
      const item = new Item(itemName, 1, 50);
      const items = [item];
      const gildedRose = new Shop(items);
      gildedRose.updateQuality();

      expect(item.quality).toBeLessThanOrEqual(50);
    });
  });
}

describe("Gilded Rose", function() {
  describe("#updateQuality", function() {
    describe("Default item", function() {
      describe("item name", function() {
        sharedBehaviorForNameValue("foo");
      });

      describe("item sellIn", function() {
        sharedBehaviorForSellInValue("foo");
      });

      describe("item quality", function() {
        sharedBehaviorForQualityValue("foo");

        describe("when sellIn date not passed yet", function() {
          it("lowers quality value by 1 at the end of the day", function() {
            const item = new Item("foo", 1, 1);
            const items = [item];
            const gildedRose = new Shop(items);
            gildedRose.updateQuality();

            expect(item.quality).toEqual(0);
          });

          it("lowers quality value by N after N days", function() {
            const n = 3;
            const item = new Item("foo", n, n);
            const items = [item];
            const gildedRose = new Shop(items);

            for (let i = 0; i < n; i++) {
              gildedRose.updateQuality();
              expect(item.quality).toEqual(n - (i + 1));
            }

            expect(item.quality).toEqual(0);
          });
        });

        describe("when sellIn date has passed", function() {
          it("lowers quality value by 2 at the end of the day", function() {
            const item = new Item("foo", 0, 4);
            const items = [item];
            const gildedRose = new Shop(items);
            gildedRose.updateQuality();

            expect(item.quality).toEqual(2);
          });

          it("lowers quality value twice as fast after N days", function() {
            const n = 5;
            const quality = 15;
            const item = new Item("foo", 0, quality);
            const items = [item];
            const gildedRose = new Shop(items);

            for (let i = 0; i < n; i++) {
              gildedRose.updateQuality();
              expect(item.quality).toEqual(quality - 2 * (i + 1));
            }

            expect(item.quality).toEqual(5);
          });
        });
      });
    });

    describe("Aged Brie item", function() {
      describe("item name", function() {
        sharedBehaviorForNameValue("Aged Brie");
      });

      describe("item sellIn", function() {
        sharedBehaviorForSellInValue("Aged Brie");
      });

      describe("item quality", function() {
        describe("when sellIn date not passed yet", function() {
          it("increases by 1 the older it gets", function() {
            const n = 3;
            const item = new Item("Aged Brie", n, 0);
            const items = [item];
            const gildedRose = new Shop(items);

            for (let i = 0; i < n; i++) {
              gildedRose.updateQuality();
              expect(item.quality).toEqual(i + 1);
            }

            expect(item.quality).toEqual(n);
          });
        });

        describe("when sellIn date has passed", function() {
          it("increases twice as fast the older it gets", function() {
            const n = 5;
            const item = new Item("Aged Brie", 0, 0);
            const items = [item];
            const gildedRose = new Shop(items);

            for (let i = 0; i < n; i++) {
              gildedRose.updateQuality();
              expect(item.quality).toEqual(2 * (i + 1));
            }

            expect(item.quality).toEqual(2 * n);
          });
        });

        it("is never more than 50", function() {
          const n = 2;
          const item = new Item("Aged Brie", n, 49);
          const items = [item];
          const gildedRose = new Shop(items);

          for (let i = 0; i < n; i++) {
            gildedRose.updateQuality();
          }

          expect(item.quality).toEqual(50);
        });
      });
    });

    describe("Sulfuras item", function() {
      describe("item name", function() {
        sharedBehaviorForNameValue("Sulfuras, Hand of Ragnaros");
      });

      describe("item sellIn", function() {
        it("does not change the sellIn", function() {
          const item = new Item("Sulfuras, Hand of Ragnaros", 2, 80);
          const items = [item];
          const gildedRose = new Shop(items);
          gildedRose.updateQuality();

          expect(item.sellIn).toEqual(2);
        });
      });

      describe("item quality", function() {
        it("does not change the quality and always equals to 80", function() {
          const item = new Item("Sulfuras, Hand of Ragnaros", 2, 80);
          const items = [item];
          const gildedRose = new Shop(items);
          gildedRose.updateQuality();

          expect(item.quality).toEqual(80);
        });
      });
    });

    describe("Backstage passes to a TAFKAL80ETC concert item", function() {
      describe("item name", function() {
        sharedBehaviorForNameValue("Backstage passes to a TAFKAL80ETC concert");
      });

      describe("item sellIn", function() {
        sharedBehaviorForSellInValue(
          "Backstage passes to a TAFKAL80ETC concert"
        );
      });

      describe("item quality", function() {
        describe("when sellIn date not passed yet", function() {
          describe("when sellIn above 10 days", function() {
            it("increases by 1 the older it gets", function() {
              const n = 5;
              const quality = 1;
              const item = new Item(
                "Backstage passes to a TAFKAL80ETC concert",
                15,
                quality
              );
              const items = [item];
              const gildedRose = new Shop(items);

              for (let i = 0; i < n; i++) {
                gildedRose.updateQuality();
                expect(item.quality).toEqual(quality + i + 1);
              }

              expect(item.quality).toEqual(quality + n);
            });

            it("increases to 50 when sellIn above 10 and quality is 49", function() {
              const item = new Item(
                "Backstage passes to a TAFKAL80ETC concert",
                15,
                49
              );
              const items = [item];
              const gildedRose = new Shop(items);
              gildedRose.updateQuality();

              expect(item.quality).toEqual(50);
            });
          });

          describe("when sellIn 10 days or less and above 5 days", function() {
            it("increases by 2 the older it gets", function() {
              const n = 5;
              const quality = 1;
              const item = new Item(
                "Backstage passes to a TAFKAL80ETC concert",
                10,
                quality
              );
              const items = [item];
              const gildedRose = new Shop(items);

              for (let i = 0; i < n; i++) {
                gildedRose.updateQuality();
                expect(item.quality).toEqual(quality + 2 * (i + 1));
              }

              expect(item.quality).toEqual(quality + 2 * n);
            });

            it("increases to 50 instead of 51 when sellIn is 6 and quality is 49", function() {
              const item = new Item(
                "Backstage passes to a TAFKAL80ETC concert",
                6,
                49
              );
              const items = [item];
              const gildedRose = new Shop(items);
              gildedRose.updateQuality();

              expect(item.quality).toEqual(50);
            });
          });

          describe("when sellIn 5 days or less", function() {
            it("increases by 3 the older it gets", function() {
              const n = 5;
              const quality = 1;
              const item = new Item(
                "Backstage passes to a TAFKAL80ETC concert",
                5,
                quality
              );
              const items = [item];
              const gildedRose = new Shop(items);

              for (let i = 0; i < n; i++) {
                gildedRose.updateQuality();
                expect(item.quality).toEqual(quality + 3 * (i + 1));
              }

              expect(item.quality).toEqual(quality + 3 * n);
            });

            it("increases to 50 instead of 52 when sellIn is 1 and quality is 49", function() {
              const item = new Item(
                "Backstage passes to a TAFKAL80ETC concert",
                1,
                49
              );
              const items = [item];
              const gildedRose = new Shop(items);
              gildedRose.updateQuality();

              expect(item.quality).toEqual(50);
            });
          });
        });

        describe("when sellIn date has passed", function() {
          it("drops to 0 after the concert", function() {
            const item = new Item(
              "Backstage passes to a TAFKAL80ETC concert",
              0,
              15
            );
            const items = [item];
            const gildedRose = new Shop(items);
            gildedRose.updateQuality();

            expect(item.quality).toEqual(0);
          });
        });
      });
    });

    describe("Conjured item", function() {
      describe("item name", function() {
        sharedBehaviorForNameValue("Conjured Mana Cake");
      });

      describe("item sellIn", function() {
        sharedBehaviorForSellInValue("Conjured Mana Cake");
      });

      describe("item quality", function() {
        sharedBehaviorForQualityValue("Conjured Mana Cake");

        it("lowers quality value by 2 at the end of the day", function() {
          const item = new Item("Conjured Mana Cake", 1, 4);
          const items = [item];
          const gildedRose = new Shop(items);
          gildedRose.updateQuality();

          expect(item.quality).toEqual(2);
        });

        it("lowers quality value twice as fast after N days", function() {
          const quality = 15;
          const item = new Item("Conjured Mana Cake", 1, quality);
          const items = [item];
          const gildedRose = new Shop(items);

          gildedRose.updateQuality();
          expect(item.quality).toEqual(13);

          gildedRose.updateQuality();
          expect(item.quality).toEqual(9);

          gildedRose.updateQuality();
          expect(item.quality).toEqual(5);
        });
      });
    });
  });
});
