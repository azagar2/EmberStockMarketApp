/**
 * Created by Abdelkader on 2015-01-31.
 */
StockMarketApp.Router.map(function() {
    this.resource('stockStateSummary', {path: '/'}, function() {
        this.resource('marketTables', { path:'/marketTables/:company_id'});
        this.resource('placeBidOrder', { path:'/buy/:company_id'});
        this.resource('placeSaleOrder', { path:'/sell/:company_id'});
    });
});
