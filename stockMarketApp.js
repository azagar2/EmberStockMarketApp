/**
 * Created by andrea on 15-03-06.
 */
StockMarketApp = Ember.Application.create({
    LOG_TRANSITIONS: true
});

StockMarketApp.ApplicationSerializer = DS.LSSerializer.extend();

StockMarketApp.ApplicationAdapter = DS.LSAdapter.extend({
    namespace: 'StockMarketApp'
});
StockMarketApp.CompanyAdapter = DS.FixtureAdapter;

