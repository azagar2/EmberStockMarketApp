/**
 * Created by andrea on 15-03-06.
 */
// We create a route of type StockMarketApp.StockStateRoute
StockMarketApp.StockStateSummaryRoute = Ember.Route.extend({
    model: function() {
        // Send all companies as the model
        return this.store.find('company');
    }
});