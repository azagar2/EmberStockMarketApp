/**
 * Created by andrea on 15-03-08.
 */
StockMarketApp.Company = DS.Model.extend({
    name: DS.attr('string'),
    symbol: DS.attr('string'),
    openPrice: DS.attr('number'),
    lastPrice: DS.attr('number', {defaultValue: 0}),
    shareVolume: DS.attr('number', {defaultValue: 0}),
    buyOrders: DS.hasMany('buyOrder'),
    sellOrders: DS.hasMany('sellOrder'),

    /* COMPUTED PROPERTIES */

    // Calculates the difference between the current price and the open price
    priceChange: function() {
        if (this.get('lastPrice') > 0)
            return +((this.get('lastPrice') - this.get('openPrice')).toFixed(2));
        else return 0;
    }.property('buyOrders', 'sellOrders'),


    // Calculates the percentage change based on the open price and price change
    percentage: function() {
        if (this.get('lastPrice') > 0)
            return +((((this.get('priceChange')) / (this.get('openPrice')) * 100)).toFixed(2));
        else return 0;
    }.property('priceChange'),

    // Displays an up, noChange or down arrow depending on the value of the price change
    arrow: function() {
        if (this.get('priceChange') > 0)
            return "images/up.png";
        else if (this.get('priceChange') == 0)
            return "images/noChange.png";
        else return "images/down.png";
    }.property('priceChange')

});



