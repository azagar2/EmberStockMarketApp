/**
 * Created by andrea on 15-03-08.
 */
StockMarketApp.PlaceBidOrderController = Ember.Controller.extend({
    actions: {
        save: function(companyID) {
            //var company = this.store.find('company', companyID).then(function(data) {
            //    console.log(data.get('name'));
            //});
            var company = this.store.find('company', companyID);
            var newOrder = this.store.createRecord('buyOrder', {
                size: this.get('volume'),
                price: this.get('price'),
                company: company
            });

            newOrder.save().then(function() {
                company.get('buyOrders').pushObject(newOrder);
            });

            //newOrder.save();
            //debugger;
            //console.log(this.store.find('company', companyID).get('data'));
            //(this.store.find('company', companyID)).get('buyOrders').addObject(this.store.createRecord('order', {
            ////model.get('buyOrders').addObject(this.store.createRecord('order', {
            //    size: this.get('volume'),
            //    price: this.get('price')
            //}));

            this.transitionToRoute('stockStateSummary');
        }
    }
});