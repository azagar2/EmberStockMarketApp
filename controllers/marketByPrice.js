/**
 * Created by andrea on 15-03-09.
 */
StockMarketApp.MarketByPriceController = Ember.Controller.extend({
    sortedBuyOrders: function() {
        console.log("hi");
        return this.get('content').get('buyOrders').toArray().sortBy('price:desc').slice(0,10);
    }.property('content.buyOrders.@each'),

    sortedSellOrders: function() {
        return this.get('content').get('sellOrders').toArray().sortBy('price:asc').slice(0,10);
    }.property('content.sellOrders.@each'),

    groupedBuyOrders: function() {
        var ungrouped = this.get('content').get('buyOrders').toArray().sortBy('price:desc');
        var newArray = new Array();

        var buyLength = ungrouped.length;
        console.log("array length = " + buyLength);
        var numContracts = 0, totalVolume = 0, price = 0, numRows = 0;

        for (i = 0; i < buyLength; i++) {

            if (i == 0) {
                price = ungrouped[i].get('price');
                numContracts++;
                totalVolume = ungrouped[i].get('size');
                console.log("original size = " + ungrouped[i].get('size'));
                console.log("totalvolume = " + totalVolume);
                console.log("first thing");
            }
            else if (price == ungrouped[i].get('price'))
            {
                numContracts++;
                totalVolume += ungrouped[i].get('size');
                console.log("totalvolume2 = " + totalVolume);
                console.log("second thing");
            }
            else
            {
                var newRecord = {
                    contracts: numContracts,
                    volume: totalVolume,
                    price: price
                };
                console.log(newRecord);
                newArray.push(newRecord);
                numContracts = 1;
                totalVolume = ungrouped[i].get('size');
                price = ungrouped[i].get('price');
                if (numRows == 10) // Check to make sure only 10 rows display.
                    break;
                console.log("third thing");
            }
        }
        return newArray;

    }.property('content.buyOrders.@each')

});