/**
 * Created by andrea on 15-03-09.
 */
StockMarketApp.MarketByOrderController = Ember.Controller.extend({
    sortedBuyOrders: function() {
        return this.get('content').get('buyOrders').toArray().sortBy('price:desc').slice(0,10);
    }.property('content.buyOrders.@each'),

    sortedSellOrders: function() {
        return this.get('content').get('sellOrders').toArray().sortBy('price:desc').slice(0,10);
    }.property('content.sellOrders.@each')
});