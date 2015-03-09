/**
 * Created by andrea on 15-03-09.
 */
StockMarketApp.MarketByPrice = Ember.Route.extend({
    model: function(params) {
        return this.store.find('company', params.company_id);
    }//,
    //renderTemplate: function() {
    //    this.render({outlet: 'content'});
    //}
});