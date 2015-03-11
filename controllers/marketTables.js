/**
 * Created by andrea on 15-03-08.
 */
StockMarketApp.MarketTablesController = Ember.Controller.extend({

    // Returns 10 buy orders in array from highest to lowest price
    sortedBuyOrders: function() {
        var myArray = this.get('content').get('buyOrders').toArray();
        //myArray.sort(function(a, b) {return a.get('price')-b.get('price')});
        myArray.sort(function(a, b) {return b.get('price')-a.get('price')});
        return myArray.slice(0,10);
    }.property('content.buyOrders.@each.size'),

    // Returns 10 sell orders in array from lowest to highest price
    sortedSellOrders: function() {
        var myArray = this.get('content').get('sellOrders').toArray();
        myArray.sort(function(a, b) {return a.get('price')-b.get('price')});
        return myArray.slice(0,10);
    }.property('content.sellOrders.@each.size'),

    // Returns 10 buy orders in array from highest to lowest price (with same prices grouped together)
    groupedBuyOrders: function() {
        var ungrouped = this.get('content').get('buyOrders').toArray();
        ungrouped.sort(function(a, b) {return a.get('price')-b.get('price')});
        var newArray = new Array();

        var arrayLength = ungrouped.length;
        var numContracts = 0, totalVolume = 0, price = 0, numRows = 0;

        for (i = 0; i < arrayLength; i++) {

            if (i == 0) {
                price = ungrouped[i].get('price');
                numContracts++;
                totalVolume = ungrouped[i].get('size');
            }
            else if (price == ungrouped[i].get('price'))
            {
                numContracts++;
                totalVolume = +totalVolume + +(ungrouped[i].get('size'));
            }
            else
            {
                numContracts = 1;
                totalVolume = ungrouped[i].get('size');
                price = ungrouped[i].get('price');
                if (numRows == 10) // Check to make sure only 10 rows display.
                    break;
            }

            if ((i == arrayLength-1) || price != ungrouped[i+1].get('price'))
            {
                var newRecord = {
                    contracts: +numContracts,
                    size: +totalVolume,
                    price: +price
                };
                newArray.push(newRecord);
            }
        }
        return newArray.reverse().slice(0,10);
    }.property('content.buyOrders.@each.size'),

    // Returns 10 sell orders in array from lowest to highest price (with same prices grouped together)
    groupedSellOrders: function() {
        var ungrouped = this.get('content').get('sellOrders').toArray();
        ungrouped.sort(function(a, b) {return a.get('price')-b.get('price')});
        var newArray = new Array();

        var arrayLength = ungrouped.length;
        var numContracts = 0, totalVolume = 0, price = 0, numRows = 0;

        for (i = 0; i < arrayLength; i++) {

            if (i == 0) {
                price = ungrouped[i].get('price');
                numContracts++;
                totalVolume = ungrouped[i].get('size');
            }
            else if (price == ungrouped[i].get('price'))
            {
                numContracts++;
                totalVolume = +totalVolume + +(ungrouped[i].get('size'));
            }
            else
            {
                numContracts = 1;
                totalVolume = ungrouped[i].get('size');
                price = ungrouped[i].get('price');
                if (numRows == 10) // Check to make sure only 10 rows display.
                    break;
            }

            if ((i == arrayLength-1) || price != ungrouped[i+1].get('price'))
            {
                var newRecord = {
                    contracts: +numContracts,
                    size: +totalVolume,
                    price: +price
                };
                newArray.push(newRecord);
            }
        }
        return newArray.slice(0,10);
    }.property('content.sellOrders.@each.size')

});