/**
 * Created by andrea on 15-03-08.
 */
StockMarketApp.Company = DS.Model.extend({
    name: DS.attr(),
    symbol: DS.attr(),
    openPrice: DS.attr(),
    lastPrice: DS.attr(),
    shareVolume: DS.attr(),
    buyOrders: DS.hasMany('order'),
    sellOrders: DS.hasMany('order')
});

