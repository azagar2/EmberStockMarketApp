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
            this.get('content').get('buyOrders').pushObject(newOrder);
            //newOrder.save();

            // Do transactions
            var sellArray = this.get('content').get('sellOrders').toArray();
            sellArray.sort(function(a, b) {return b.get('price')-a.get('price')});
            for (i = 0; i < sellArray.length; i++) {
                console.log(sellArray[i].get('id'));
            }

            if (sellArray.length > 0)
            {
                console.log("in the loop");
                var deleteSellArray = [];

                // Makes sure the buyOrder price is higher than sellOrder price, or else no transaction occurs.

                for (var i = 0; i < sellArray.length; i++)
                {
                    var sellOrder = sellArray[i];
                    if (sellOrder.get('price') >= newOrder.get('price'))
                    {
                        // If the buyOrder size <= sellOrder size, possibly many transactions will occur.
                        if (sellOrder.get('size') <= newOrder.get('size')) {

                            this.get('content').set('lastPrice', sellOrder.get('price'));
                            var temp = this.get('content').get('shareVolume');
                            temp = +(sellOrder.get('size')) + +temp;
                            this.get('content').set('shareVolume', temp);

                            // If the two sizes equal each other, only one transaction will occur in total.
                            if (sellOrder.get('size') == newOrder.get('size')) {
                                console.log("equal");
                                deleteSellArray.push(sellOrder.get('id'));
                                newOrder.set('size', 0);
                                break;
                            }
                            else {
                                console.log("buy > sell");
                                var newSize = +(newOrder.get('size')) - +(sellOrder.get('size'));
                                //var firstOrder = this.store.find('sellOrder', newOrder.get('id'));
                                newOrder.set('size', newSize);
                                deleteSellArray.push(sellOrder.get('id'));
                            }
                        }
                        // If buyOrder size < sellOrder size, one transaction may occur.
                        else
                        {
                            console.log("buy < sell");
                            this.get('content').set('lastPrice', newOrder.get('price'));
                            var newVolume = +(this.get('content').get('shareVolume')) + +(newOrder.get('size'));
                            this.get('content').set('shareVolume', newVolume);
                            var newSize = +(sellOrder.get('size')) - +(newOrder.get('size'));

                            console.log(this.store.find('sellOrder', sellOrder.get('id')).get('content'));
                            sellOrder.set('size', newSize);
                            newOrder.set('size', 0);
                            break;
                        }
                    }
                }

                for (i = 0; i < deleteSellArray.length; i++) {
                    this.store.find('sellOrder', deleteSellArray[i]).then(function (order) {
                        order.destroyRecord();
                    });
                }
                if (newOrder.get('size') == 0) {
                    this.store.find('buyOrder', newOrder.get('id')).then(function (order) {
                        order.destroyRecord();
                    });
                }
            }


                //// Do transactions
                //var buyArray = this.get('content').get('buyOrders').toArray();
                //if (buyArray.length > 0) {
                //    buyArray.sort(function(a, b) {return a.get('price')-b.get('price')});
                //    for (i = 0; i < buyArray.length; i++) {
                //        console.log(buyArray[i].get('price'));
                //    }
                //}
                //var sellArray = this.get('content').get('sellOrders').toArray();
                //if (sellArray.length > 0) {
                //    sellArray.sort(function(a, b) {return b.get('price')-a.get('price')});
                //    for (i = 0; i < sellArray.length; i++) {
                //        console.log(sellArray[i].get('price'));
                //    }
                //}
                //
                //if ((sellArray.length > 0) && (buyArray.length > 0))
                //{
                //    console.log("in the loop");
                //    var buyOrder = buyArray[0];
                //    var sellOrder = sellArray[0];
                //    var deleteBuyArray = [];
                //    var deleteSellArray = [];
                //
                //    // Makes sure the buyOrder price is higher than sellOrder price, or else no transaction occurs.
                //    while (buyOrder.get('price') >= sellOrder.get('price'))
                //    {
                //        // If the buyOrder size <= sellOrder size, a transaction will occur.
                //        if (buyOrder.get('size') <= sellOrder.get('size'))
                //        {
                //            this.get('content').set('lastPrice', buyOrder.get('price'));
                //            var temp = this.get('content').get('shareVolume');
                //            temp = +(buyOrder.get('size')) + +temp;
                //            this.get('content').set('shareVolume', temp);
                //
                //            // If the two sizes equal each other, only one transaction will occur in total.
                //            if (buyOrder.get('size') == sellOrder.get('size'))
                //            {
                //                console.log("EQUAL SIZE");
                //                console.log("push " + buyOrder.get('id'));
                //                deleteBuyArray.push(buyOrder.get('id'));
                //                deleteSellArray.push(sellOrder.get('id'));
                //
                //                //this.store.find('sellOrder', sellID).then(function (order) {
                //                //    order.destroyRecord();
                //                //});
                //                //this.store.find('buyOrder', buyID).then(function (order) {
                //                //    order.destroyRecord();
                //                //});
                //                //break;
                //            }
                //            else
                //            {
                //                var newSize = +(sellOrder.get('size')) - +(buyOrder.get('size'));
                //                var firstOrder = this.store.find('sellOrder', sellID);
                //                firstOrder.set('size', newSize);
                //                deleteBuyArray.push(buyOrder.get('id'));
                //            }
                //            console.log("a transaction will occur");
                //            //break;
                //        }
                //        // If buyOrder size > sellOrder size, more than one transaction may occur.
                //        else
                //        {
                //            this.get('content').set('lastPrice', sellOrder.get('price'));
                //            var newVolume = +(this.get('content').get('shareVolume')) + +(sellOrder.get('size'));
                //            this.get('content').set('shareVolume', newVolume);
                //            var newSize = +(buyOrder.get('size')) - +(sellOrder.get('size'));
                //            var firstOrder = this.store.find('buyOrder', buyID);
                //            firstOrder.set('size', newSize);
                //            deleteSellArray.push(sellOrder.get('id'));
                //        }
                //
                //        var isNotDone = 0;
                //        var firstDone = false;
                //        var secondDone = false;
                //        var buyRecordsToDestroy = +(deleteBuyArray.length);
                //        var sellRecordsToDestroy = +(deleteSellArray.length);
                //        //var recordsToDestroy = +(deleteBuyArray.length) + +(deleteSellArray.length);
                //
                //        while (isNotDone < 2) {
                //
                //            if (buyRecordsToDestroy) {
                //                console.log("entered first for loop");
                //                for (i = 0; i < deleteBuyArray.length; i++) {
                //                    this.store.find('buyOrder', deleteBuyArray[i]).then(function (order) {
                //                        console.log("destroyed buy order with ID = " + deleteBuyArray[i]);
                //                        order.destroyRecord();
                //                        buyRecordsToDestroy--;
                //                        console.log("record destroyed");
                //                        var buyArray = company.get('content').get('buyOrders').toArray();
                //                        buyArray.sort(function(a, b) {return a.get('price')-b.get('price')});
                //                        console.log(buyArray.length);
                //                        console.log(buyRecordsToDestroy);
                //                    });
                //                }
                //
                //                while (buyRecordsToDestroy)
                //                {
                //                    console.log("first loop");// do nothing
                //                };
                //                isNotDone++;
                //            }
                //
                //            if (sellRecordsToDestroy) {
                //                console.log("entered second for loop");
                //                for (i = 0; i < deleteSellArray.length; i++) {
                //                    this.store.find('sellOrder', deleteSellArray[i]).then(function (order) {
                //                        console.log("destroyed sell order with ID = " + deleteSellArray[i]);
                //                        order.destroyRecord();
                //                        var sellArray = company.get('content').get('sellOrders').toArray();
                //                        sellArray.sort(function(a, b) {return b.get('price')-a.get('price')});
                //                        console.log(sellArray.length);
                //                        sellRecordsToDestroy--;
                //                        console.log(sellRecordsToDestroy);
                //                    });
                //                }
                //
                //                while (buyRecordsToDestroy)
                //                {
                //                    // do nothing
                //                };
                //                isNotDone++;
                //            }
                //        }
                //
                //        // Buy array
                //
                //        break;
                //
                //        if ((sellArray.length > 0) && (buyArray.length > 0))
                //        {
                //            console.log("in the loop second");
                //            var buyOrder = buyArray[0];
                //            var sellOrder = sellArray[0];
                //        }
                //        else break;
                //    }
                //}

            //this.transitionToRoute('stockStateSummary');
        }
    }
});