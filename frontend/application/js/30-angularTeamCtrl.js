
window.teambuddy.controller('teamController', ['$scope', '$http', function ($scope, $http) {

// when submitting the add form, send the text to the node API
	$scope.createTeam = function () {
		$http.post('/api/teams', $scope.team)
			.success(function (data) {
				$scope.team = {}; // clear the form so our user is ready to enter another
				console.log(11, data);
				$scope.teams = data;
			})
			.error(function (data) {
				console.log('Error: ' + data);
			});
	};

// delete a team after checking it
	$scope.deleteTeam = function (id) {
		$http.delete('/api/teams/' + id)
			.success(function (data) {
				$scope.teams = data;
				console.log(data);
			})
			.error(function (data) {
				console.log('Error: ' + data);
			});
	};

}])