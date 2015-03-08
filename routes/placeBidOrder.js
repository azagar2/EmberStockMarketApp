/**
 * Created by andrea on 15-03-06.
 */
StockMarketApp.MarketTablesRoute = Ember.Route.extend({
    renderTemplate: function() {
        this.render({outlet: 'content'});
    }
});