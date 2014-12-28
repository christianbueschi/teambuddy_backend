
window.teambuddy.controller('eventController', ['$scope', '$http', function ($scope, $http) {

// when submitting the add form, send the text to the node API
	$scope.createEvent = function(event, idTeam) {
		$http.post('/api/events/' + idTeam, event)
			.success(function(teams) {
				$scope.teams = teams;
				setSelectedTeam(teams, idTeam);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// delete a team after checking it
	$scope.deleteEvent = function(idTeam, idEvent) {
		$http.delete('/api/events/' + idTeam + '/' + idEvent)
			.success(function(teams) {
				$scope.teams = teams;
				setSelectedTeam(teams, idTeam);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	function setSelectedTeam(teams, currentTeamId) {
		for(var i = 0; i < teams.length; i++ ) {
			if(teams[i]._id === currentTeamId ) {
				$scope.selectedTeam = teams[i];
			}
		}
	}

	$scope.changeTeam = function() {

		console.log(222, $scope.selectedTeam);
		localStorage.setItem('team',$scope.selectedTeam.name);
	};

}])