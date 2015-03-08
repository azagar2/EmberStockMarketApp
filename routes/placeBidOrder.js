/**
 * Created by andrea on 15-03-06.
 */
StockMarketApp.PlaceBidOrderRoute = Ember.Route.extend({
    model: function(params) {
        return this.store.find('company', params.company_id);
    },
    renderTemplate: function() {
        this.render({outlet: 'content'});
    }
});