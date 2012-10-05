angular.module('openvoteServices', ['ngResource'])
    .factory('Election', function($resource){
        // Code for defining Election API stuff
        return $resource('/api/v1/election/:electionId', {}, {
            get: {method: 'GET', params: {format: 'json'}},
            save: {method: 'POST', headers: {'Content-Type': 'application/json'}},
            update: {method: 'PUT', headers: {'Content-Type': 'application/json'}}
        });
    })
    .factory('Candidate', function($resource){
        // Code for defining Election API stuff
        return $resource('/api/v1/candidate/:electionId', {}, {
            get: {method: 'GET', params: {format: 'json'}},
            save: {method: 'POST', headers: {'Content-Type': 'application/json'}},
            update: {method: 'PUT', headers: {'Content-Type': 'application/json'}}
        });
    });
