function AppCtrl($scope, Vote, CivicElections) {
    $scope.voter = window.openvote.voter_json;

    CivicElections.get({}, function success(data) {
        $scope.contests = data.elections;
        console.log(data);
    });

    $scope.contests_voted = function () {
        return 3;
    };

    $scope.contests_unvoted = function () {
        return 0;
    };

    $scope.updateCandidate = function(candidate) {
        $scope.current_candidate = candidate;
    };

    $scope.updateContest = function(contest) {
        $scope.current_contest = contest;
    };

    $scope.vote = function(candidate) {
        var vote_json = {
            "candidate": candidate.candidate,
            "contest": candidate.contest,
            "voter": "/api/v1/voter/1/",
            "approval": candidate.approved
        };

        if (candidate.vote === "") {
            Vote.save({}, vote_json,
                function (vote) {
                    //TODO: update vote id with new value
                }
            );
        } else {
            Vote.update({voteId: candidate.vote}, vote_json, null,
                function (error) {
                    //TODO: Set approved to original value on error
                }
            );
        }
    };
}
AppCtrl.$inject = ['$scope', 'Vote', 'CivicElections'];

function ContestsCtrl($scope) {}
ContestsCtrl.$inject = ['$scope'];

function ContestCtrl($scope, $location, $routeParams, Contest, CivicVoterQuery) {
    // TODO: if user navigates, this won't work
    //if ($scope.current_contest.id !== $routeParams.contestId) {
        //$scope.current_contest = $scope.contests[$routeParams.contestId];
    //}

    CivicVoterQuery.get(
        {
            contestId: $scope.current_contest.id
        },
        {
            address: openvote.reverse_geocode.results[0].formatted_address
        },
        function success(data) {
            console.log(data);
        },
        function error(data) {
            debugger;
        }
    );

    $scope.reset = function () {
        var contestId = $routeParams.contestId;
        Contest.get({contestId: contestId},
            function (contest) {
                _.extend($scope.contests[contestId], contest);
            }
        );
    };

    $scope.update = function () {
        var contest = $scope.current_contest;
        var contestId = $routeParams.contestId;
        var update_json = {
                "desc": contest.desc,
                "contest_day": "2012-11-10",
                "htmlslug": contest.htmlslug,
                "name": contest.name,
                "votercount": contest.votercount,
                "admin": contest.admin
        };
        Contest.update({contestId: contestId}, update_json);
            //function () {
                //_.extend($scope.contests[contestId], update_json);
            //}
        //);
    };

    $scope.destroy = function () {
        var contestId = $routeParams.contestId;
        Contest.destroy({contestId: contestId},
            function () {
                delete $scope.contests[contestId];
            }
        );
    };
}
ContestCtrl.$inject = ['$scope', '$location', '$routeParams', 'Contest', 'CivicVoterQuery'];

function CandidateCtrl($scope, $location, $routeParams, Candidate) {
    if ($scope.current_candidate.id !== $routeParams.candidateId) {
        $scope.current_candidate = $scope.contests[$routeParams.contestId].candidates[$routeParams.candidateId];
    }

    $scope.update = function () {
        var candidate = $scope.current_candidate;
        var contestId = $routeParams.contestId;
        var candidateId = $routeParams.candidateId;
        var update_json = {
                "desc": candidate.desc,
                "contest_day": "2012-11-10",
                "htmlslug": candidate.htmlslug,
                "name": candidate.name,
                "contest": candidate.contest
        };
        Candidate.update({candidateId: candidateId}, update_json,
            function () {
                _.extend($scope.contests[contestId].candidates[candidateId], update_json);
            }
        );
    };
}
CandidateCtrl.$inject = ['$scope', '$location', '$routeParams', 'Candidate'];

function VoterCtrl($scope) {
    $scope.authVoter = function() {
        if ($("#voterid").val() == "0") {
            $scope.voter = {name:'Guest', is_authenticated:false};
        } else {
            $scope.voter = {name:"Authenticated", is_authenticated:true};
        }
    };
}
VoterCtrl.$inject = ['$scope'];
