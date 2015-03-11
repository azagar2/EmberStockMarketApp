/**
 * Created by andrea on 15-03-10.
 */
// Controls what the stock state summary table is sorted by
StockMarketApp.StockStateSummaryController = Ember.Controller.extend({

    actions: {
        setMode: function(mode) {
            this.set('mode', mode);
            this.transitionToRoute('stockStateSummary');
        }
    },

    mode: 0,


    sortedCompanies: function () {

        // If mode is 0, display companies in table from highest to lowest share volume
        if ((this.get('mode') == 0))
        {
            var companyArray = this.get('content').toArray();
            companyArray.sort(function (a, b) {
                return +(+(b.get('shareVolume')) - +(a.get('shareVolume')));
            });
            return companyArray;
        }

        // If mode is 1, display companies in table who have a priceChange > 0 (ordered from highest to lowest)
        else if ((this.get('mode') == 1))
        {
            var companyArray = this.get('content').toArray();
            var myArray = [];
            companyArray.sort(function (a, b) {
                return ((b.get('priceChange')) - (a.get('priceChange')));
            });
            for (i = 0; i < companyArray.length; i++)
            {
                if (companyArray[i].get('priceChange') > 0) {
                    myArray.push(companyArray[i]);
                }
                else break;
            }
            return myArray;
        }

        // Otherwise, display companies in table who have a priceChange < 0 (ordered from highest to lowest)
        else
        {
            var companyArray = this.get('content').toArray();
            var myArray = [];
            companyArray.sort(function (a, b) {
                return +(+(a.get('priceChange')) - +(b.get('priceChange')));
            });
            for (i = 0; i < companyArray.length; i++)
            {
                if (companyArray[i].get('priceChange') < 0) {
                    myArray.push(companyArray[i]);
                }
                else break;
            }
            return myArray;
        }

    }.property('content.@each.shareVolume', 'mode')
});


