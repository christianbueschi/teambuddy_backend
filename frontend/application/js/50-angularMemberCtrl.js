
window.teambuddy.controller('memberController', ['$scope', '$http', function ($scope, $http) {

// when submitting the add form, send the text to the node API
	$scope.createMember = function(member, idTeam) {
		$http.post('/api/members/' + idTeam, member)
			.success(function(teams) {
				$scope.teams = teams;
				setSelectedTeam(teams, idTeam);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// delete a team after checking it
	$scope.deleteMember = function(idTeam, idMember) {
		$http.delete('/api/members/' + idTeam + '/' + idMember)
			.success(function(data) {
				$scope.teams = data;
				console.log(data);
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
		localStorage.setItem('team',$scope.selectedTeam.name);
	};

	$scope.editMember = function(member) {
		console.log($scope.selectedTeam);
		$scope.editing = $scope.selectedTeam.members.indexOf(member);
	}

}])