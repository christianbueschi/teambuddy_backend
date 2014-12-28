
window.teambuddy.controller('mainController', ['$scope', '$http', function ($scope, $http) {

	// when landing on the page, get all teams and show them
	$http.get('/api/teams')
		.success(function(teams) {
			$scope.teams = teams;
			setTeamIfExists(teams);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	function setTeamIfExists(teams) {
		var	team = localStorage.getItem('team');
		if(team) {
			for (var i = 0; i<teams.length; i++ ) {
				if(team === teams[i].name) {
					$scope.selectedTeam = teams[i];
				}
			}
		}
	}


}]);