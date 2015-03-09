/**
 * Created by andrea on 15-03-08.
 */
StockMarketApp.PlaceBidOrderController = Ember.ObjectController.extend({

    actions: {
        save: function(companyID) {
            var buyOrderList;
            var company = this.store.find('company', companyID);
            var newOrder = this.store.createRecord('buyOrder', {
                size: this.get('volume'),
                price: this.get('price'),
                company: company
            });

            newOrder.save().then(function() {
                company.get('buyOrders').pushObject(newOrder);
            });

            //this.transitionToRoute('stockStateSummary');
        }
    }
});