/**
 * Created by andrea on 15-03-06.
 */
// We create a route of type StockMarketApp.StockStateRoute
StockMarketApp.StockStateSummaryRoute = Ember.Route.extend({
    model: function() {
        return  this.store.find('company') ;
        // "this.store" is the data store represented by the adapter
    }
});