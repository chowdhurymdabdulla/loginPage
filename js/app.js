var app = angular.module("app", ['ngRoute']).config(function($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'login.html',
        controller: 'LoginController'
    });

    $routeProvider.when('/home', {
        templateUrl: 'home.html',
        controller: 'HomeController'
    })

    $routeProvider.otherwise({ redirectTo: '/login' });
});


app.factory("AuthencationService", function($location){
  return {
    login: function(credentials){
      if (credentials.username == 'Ralaph') {
            $location.path('/home');
        }
      },
    logout: function(){
      $location.path('/login');
    }
  };
});
app.controller("LoginController", function($scope, AuthencationService) {
    $scope.credentials = { username: "", password: "" }
    $scope.login = function() {
        AuthencationService.login($scope.credentials);
    };
});

app.controller("HomeController", function($scope, AuthencationService) {
    $scope.title = "Home";
    $scope.message = "Mouse Over these images to seee a directives beheviour";

    $scope.logout = function(){
      AuthencationService.logout();
    };
});

app.directive('showsMessageWhenHovered', function() {
    return {
        restrict: "A", // A = Attribute, C = CSS Class, E = HTML Element, M = HTML Comment
        link: function(scope, element, attributes) {
            var originalMessage = scope.message;
            element.bind("mouseenter", function() {
                scope.message = attributes.message;
                scope.$apply();
            });
            element.bind("mouseleave", function() {
                scope.message = originalMessage;
                scope.$apply();
            })
        }
    };
});

