/**
 * Created by andrea on 15-03-08.
 */
StockMarketApp.PlaceSaleOrderController = Ember.ObjectController.extend({

    actions: {
        save: function(companyID) {
            var sellOrderList;
            var company = this.store.find('company', companyID);
            // Create a new sell order from data submitted in form
            var newOrder = this.store.createRecord('sellOrder', {
                size: this.get('volume'),
                price: this.get('price'),
                company: company
            });
            // Add sale order to Company sellOrders
            this.get('content').get('sellOrders').pushObject(newOrder);

            // Get the buyOrders and sort them in descending order
            var buyArray = this.get('content').get('buyOrders').toArray();
            buyArray.sort(function(a, b) {return b.get('price')-a.get('price')});

            if (buyArray.length > 0)
            {
                // Orders to delete at the end
                var deleteBuyArray = [];

                for (var i = 0; i < buyArray.length; i++)
                {
                    var buyOrder = buyArray[i];
                    // Makes sure the buyOrder price is higher than sellOrder price, or else no transaction occurs.
                    if (buyOrder.get('price') >= newOrder.get('price'))
                    {
                        // If the buyOrder size <= sellOrder size
                        if (+(buyOrder.get('size')) <= +(newOrder.get('size'))) {

                            // Update company shareVolume and lastPrice
                            this.get('content').set('lastPrice', buyOrder.get('price'));
                            var temp = this.get('content').get('shareVolume');
                            temp = +(buyOrder.get('size')) + +temp;
                            this.get('content').set('shareVolume', temp);

                            // If the two sizes equal each other, only one transaction will occur in total.
                            if (+(buyOrder.get('size')) == +(newOrder.get('size'))) {
                                console.log("equal");
                                deleteBuyArray.push(buyOrder.get('id'));
                                newOrder.set('size', 0);
                                break;
                            }
                            // Many transactions may occur
                            else {
                                var newSize = +(newOrder.get('size')) - +(buyOrder.get('size'));
                                //var firstOrder = this.store.find('sellOrder', newOrder.get('id'));
                                newOrder.set('size', newSize);
                                deleteBuyArray.push(buyOrder.get('id'));
                            }
                        }
                        // If buyOrder size > sellOrder size, one transaction may occur.
                        else
                        {
                            this.get('content').set('lastPrice', newOrder.get('price'));
                            var newVolume = +(this.get('content').get('shareVolume')) + +(newOrder.get('size'));
                            this.get('content').set('shareVolume', newVolume);
                            var newSize = +(buyOrder.get('size')) - +(newOrder.get('size'));
                            buyOrder.set('size', newSize);
                            newOrder.set('size', 0);
                            break;
                        }
                    }
                }

                // Delete all necessary orders
                for (i = 0; i < deleteBuyArray.length; i++) {
                    this.store.find('buyOrder', deleteBuyArray[i]).then(function (order) {
                        order.destroyRecord();
                    });
                }

                // If entire volume of newOrder has been used up, delete the newOrder
                if (newOrder.get('size') == 0) {
                    this.store.find('sellOrder', newOrder.get('id')).then(function (order) {
                        order.destroyRecord();
                    });
                }
            }
        }
    }
});