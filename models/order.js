/**
 * Created by andrea on 15-03-08.
 */
StockMarketApp.Order = DS.Model.extend({
    date: DS.attr('string', { defaultValue: function() { return new Date(); }}),
    size: DS.attr(),
    price: DS.attr()
    //company: DS.belongsTo('company')
});