/**
 * Created by andrea on 15-03-08.
 */
StockMarketApp.PlaceBidOrderController = Ember.Controller.extend({
    actions: {
        save: function() {
            var newOrder = this.store.createRecord('order', {
                size: this.get('volume'),
                price: this.get('price')
            });
            newOrder.save();

            model.get('buyOrders').addObject(this.store.createRecord('order', {
                size: this.get('volume'),
                price: this.get('price')
            }));

            this.transitionToRoute('stockStateSummary');
        }
    }
});