/**
 * Created by andrea on 15-03-08.
 */
StockMarketApp.PlaceSaleOrderController = Ember.ObjectController.extend({

    actions: {
        save: function(companyID) {
            var sellOrderList;
            var company = this.store.find('company', companyID);
            var newOrder = this.store.createRecord('sellOrder', {
                size: this.get('volume'),
                price: this.get('price'),
                company: company
            });

            newOrder.save().then(function() {
                company.get('sellOrders').pushObject(newOrder);
            });

            //this.transitionToRoute('stockStateSummary');
        }
    }
});