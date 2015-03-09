/**
 * Created by andrea on 15-03-08.
 */
StockMarketApp.SellOrder = DS.Model.extend({
    date: DS.attr('string', { defaultValue: function() { return new Date(); }}),
    size: DS.attr('number'),
    price: DS.attr('number'),
    company: DS.belongsTo('company')
});