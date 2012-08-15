define(['jquery', 'backbone'], function($, Backbone) {

    var Election = Backbone.Model.extend({
            
            urlRoot: '/api/v1/election/',
            idAttribute: 'id',

    });

    // Returns the Model class
    return Election;

});
