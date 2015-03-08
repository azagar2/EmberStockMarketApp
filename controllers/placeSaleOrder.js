/**
 * Created by andrea on 15-03-08.
 */
StockMarketApp.PlaceSaleOrderController = Ember.Controller.extend({
    actions: {
        sendMessage: function() {
            var msg = prompt ('Type your message');
        }
    }
});