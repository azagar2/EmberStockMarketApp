/**
 * Created by andrea on 15-03-08.
 */
StockMarketApp.MarketTablesController = Ember.Controller.extend({
    actions: {
        sendMessage: function() {
            var msg = prompt ('Type your message');
        }
    }
});