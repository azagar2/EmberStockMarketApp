/**
 * Created by andrea on 15-03-08.
 */
StockMarketApp.MarketTablesRoute = Ember.Route.extend({

    renderTemplate: function() {
        this.render({outlet: 'content'});
    }
});