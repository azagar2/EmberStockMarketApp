/**
 * Created by andrea on 15-03-08.
 */
StockMarketApp.LogoRoute = Ember.Route.extend({
    renderTemplate: function() {
        this.render({outlet: 'logo'});
    }
});