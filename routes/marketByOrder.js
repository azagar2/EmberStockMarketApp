/**
 * Created by andrea on 15-03-09.
 */
StockMarketApp.MarketByOrderRoute = Ember.Route.extend({
    model: function(params) {
        return this.store.find('company', params.company_id);
    }//,
    //renderTemplate: function() {
    //    this.render({outlet: 'content'});
    //}
});