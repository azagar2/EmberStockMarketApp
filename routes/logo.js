/**
 * Created by andrea on 15-03-08.
 */
StockMarketApp.LogoRoute = Ember.Route.extend({
    model: function(params) {
        // Send a specific company as the model
        return this.store.find('company', params.company_id);
    }
});