/**
 * Created by andrea on 15-03-08.
 */
StockMarketApp.Company = DS.Model.extend({
    name: DS.attr(),
    symbol: DS.attr(),
    openPrice: DS.attr(),
    lastPrice: DS.attr(),
    shareVolume: DS.attr(),
    buyOrders: DS.hasMany('buyOrder'),
    sellOrders: DS.hasMany('sellOrder'),

    ////buyOrdersSorting: ['buyOrder.price:desc'],
    //sortedBuyOrders: Ember.computed.sort('buyOrders', function(a, b) {
    //    var a1 = parseFloat(a.get('price'));
    //    console.log(a1.get('price'));
    //    var b1 = parseFloat(b.get('price'));
    //    if (a1 < b1) { return 1;}
    //    if (a1 > b1) { return -1;}
    //    else return 0;
    //})
});



