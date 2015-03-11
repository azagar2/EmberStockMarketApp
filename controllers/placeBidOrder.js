/**
 * Created by andrea on 15-03-08.
 */
StockMarketApp.PlaceBidOrderController = Ember.ObjectController.extend({

    actions: {
        save: function(companyID) {
            var buyOrderList;
            var company = this.store.find('company', companyID);
            // Create a new buy order from data submitted in form
            var newOrder = this.store.createRecord('buyOrder', {
                size: this.get('volume'),
                price: this.get('price'),
                company: company
            });
            // Add buy order to Company buyOrders
            this.get('content').get('buyOrders').pushObject(newOrder);

            // Get the sellOrders and sort them in ascending order
            var sellArray = this.get('content').get('sellOrders').toArray();
            sellArray.sort(function(a, b) {return a.get('price')-b.get('price')});

            if (sellArray.length > 0)
            {
                // Orders to delete at the end
                var deleteSellArray = [];

                for (var i = 0; i < sellArray.length; i++)
                {
                    var sellOrder = sellArray[i];
                    // Makes sure the buyOrder price is higher than sellOrder price, or else no transaction occurs.
                    if (sellOrder.get('price') <= newOrder.get('price'))
                    {
                        // If the buyOrder size >= sellOrder size
                        if (+(sellOrder.get('size')) <= +(newOrder.get('size'))) {

                            // Update company shareVolume and lastPrice
                            this.get('content').set('lastPrice', sellOrder.get('price'));
                            var temp = (this.get('content').get('shareVolume')) + +(sellOrder.get('size'));
                            this.get('content').set('shareVolume', temp);

                            // If the two sizes equal each other, only one transaction will occur in total.
                            if (+(sellOrder.get('size')) == +(newOrder.get('size'))) {
                                console.log("equal");
                                deleteSellArray.push(sellOrder.get('id'));
                                newOrder.set('size', 0);
                                break;
                            }
                            // Many transactions may occur
                            else {
                                var newSize = +(newOrder.get('size')) - +(sellOrder.get('size'));
                                //var firstOrder = this.store.find('sellOrder', newOrder.get('id'));
                                newOrder.set('size', newSize);
                                deleteSellArray.push(sellOrder.get('id'));
                            }
                        }
                        // If buyOrder size < sellOrder size, one transaction may occur.
                        else
                        {
                            this.get('content').set('lastPrice', newOrder.get('price'));
                            var newVolume = +(this.get('content').get('shareVolume')) + +(newOrder.get('size'));
                            this.get('content').set('shareVolume', newVolume);
                            var newSize = +(sellOrder.get('size')) - +(newOrder.get('size'));
                            sellOrder.set('size', newSize);
                            newOrder.set('size', 0);
                            break;
                        }
                    }
                }

                // Delete all necessary orders
                for (i = 0; i < deleteSellArray.length; i++) {
                    this.store.find('sellOrder', deleteSellArray[i]).then(function (order) {
                        order.destroyRecord();
                    });
                }

                // If entire volume of newOrder has been used up, delete the newOrder
                if (newOrder.get('size') == 0) {
                    this.store.find('buyOrder', newOrder.get('id')).then(function (order) {
                        order.destroyRecord();
                    });
                }
            }
        }
    }
});