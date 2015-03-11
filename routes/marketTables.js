/**
 * Created by andrea on 15-03-08.
 */
StockMarketApp.MarketTablesRoute = Ember.Route.extend({
    model: function(params) {
        // Send a specific company as the model
        return this.store.find('company', params.company_id);
    },
    renderTemplate: function() {
        // This renders the marketTables template in the outlet labelled as 'content' in the StockStateSummary template
        this.render({outlet: 'content'});
    }
});