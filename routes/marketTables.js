/**
 * Created by andrea on 15-03-08.
 */
StockMarketApp.MarketTablesRoute = Ember.Route.extend({
    model: function(params) {
        return this.store.find('company', params.company_id);
    },
    renderTemplate: function() {
        this.render({outlet: 'content'});
    }
});