/**
 * Created by Abdelkader on 2015-01-31.
 */
StockMarketApp.Router.map(function() {
    this.resource('stockStateSummary', {path: '/'}, function() {
        this.resource('marketTables');
        this.resource('placeBidOrder');
        this.resource('placeSaleOrder');
    });
});


    //this.resource('marketByOrder');
    //this.resource('marketByPrice');

    //this.resource('contact', function(){
    //    this.resource('phone');
    //    this.resource('email');
    //});

