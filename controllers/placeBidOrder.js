/**
 * Created by andrea on 15-03-08.
 */
StockMarketApp.PlaceBidOrderController = Ember.Controller.extend({
    actions: {
        save: function(companyID) {
            var newOrder = this.store.createRecord('order', {
                size: this.get('volume'),
                price: this.get('price')
            });
            newOrder.save();
            console.log("hi");

            //model.get('buyOrders').addObject(this.store.createRecord('order', {
            //    size: this.get('volume'),
            //    price: this.get('price')
            //}));

            //this.transitionToRoute('stockStateSummary');
        }
    }

});