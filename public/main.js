var BASE_URL = "http://jservice.io";

var categoriesUrl = "/api/categories?count=5";

var categoryUrl = "/api/category?id={0}";

angular
  .module("mainApp", [])
  .controller("mainController", ['$scope', '$http', ($scope, $http) => {

    $scope.clueSelected = false;
    $scope.currentScore = 0;
    $scope.cancel = () => {
      $scope.clueSelected = false;
    };
    $scope.update = (answer) => {
      console.log(answer);
      if (answer == $scope.selectedClue.answer) {
        console.log("CORRECT");
        $scope.currentScore += $scope.selectedClue.value;
        $scope.clueSelected = false;
      } else {
        $scope.currentScore -= $scope.selectedClue.value;
        $scope.clueSelected = false;
      }
    };

    $http({
      method: "GET",
      url: BASE_URL + categoriesUrl
    }).then(response => {

      $scope.categories = response.data;

      $scope.categories.forEach(category => {

        $http({
          method: "GET",
          url: BASE_URL + categoryUrl.replace("{0}", category.id)
        }).then(response => {

          category.clues = response.data.clues;
        });

      });
    });

    $scope.selectClue = (clue) => {

      $scope.selectedClue = clue;
      $scope.clueSelected = true;
    };

    $scope.hideClue = () => {

      $scope.clueSelected = false;
    };

  }]);