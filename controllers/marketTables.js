/**
 * Created by andrea on 15-03-08.
 */
StockMarketApp.MarketTablesController = Ember.Controller.extend({
    sortedBuyOrders: function() {
        var myArray = this.get('content').get('buyOrders').toArray();
        myArray.sort(function(a, b) {return a.get('price')-b.get('price')});
        return myArray.slice(0,10);
    }.property('content.buyOrders.@each'),

    sortedSellOrders: function() {
        var myArray = this.get('content').get('sellOrders').toArray();
        myArray.sort(function(a, b) {return a.get('price')-b.get('price')});
        return myArray.reverse().slice(0,10);
    }.property('content.sellOrders.@each'),

    groupedBuyOrders: function() {
        var ungrouped = this.get('content').get('buyOrders').toArray();
        ungrouped.sort(function(a, b) {return a.get('price')-b.get('price')});
        var newArray = new Array();

        var buyLength = ungrouped.length;
        var numContracts = 0, totalVolume = 0, price = 0, numRows = 0;

        for (i = 0; i < buyLength; i++) {

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

            if ((i == buyLength-1) || price != ungrouped[i+1].get('price'))
            {
                var newRecord = {
                    contracts: +numContracts,
                    size: +totalVolume,
                    price: +price
                };
                newArray.push(newRecord);
            }
        }
        return newArray;

    }.property('content.buyOrders.@each'),

    groupedSellOrders: function() {
        var ungrouped = this.get('content').get('sellOrders').toArray();
        ungrouped.sort(function(a, b) {return a.get('price')-b.get('price')}).reverse();
        var newArray = new Array();

        var sellLength = ungrouped.length;
        var numContracts = 0, totalVolume = 0, price = 0, numRows = 0;

        for (i = 0; i < sellLength; i++) {

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

            if ((i == sellLength-1) || price != ungrouped[i+1].get('price'))
            {
                var newRecord = {
                    contracts: +numContracts,
                    size: +totalVolume,
                    price: +price
                };
                newArray.push(newRecord);
            }
        }
        return newArray;
    }.property('content.sellOrders.@each')

    //orders: Ember.computed.sort('model.content.buyOrders', function(a,b) {
    //    var a1 = parseFloat(a.get('price'));
    //    var b1 = parseFloat(b.get('price'));
    //    if (a1 < b1) { return 1;}
    //    if (a1 > b1) { return -1;}
    //    else return 0;
    //}),
    //
    //orderedList: function() {
    //    return ('orders').slice(0,10);
    //}

    //['price:desc']
    //sort(function(a, b) {return a.price- b.price})
    //;

});