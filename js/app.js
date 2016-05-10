var MyApp = angular.module('MyApp', []).config(function($interpolateProvider){
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

var MyCtrl = MyApp.controller("MyCtrl",[ '$scope', '$http', function($scope, $http){
	$scope.initApp = function(){
		$scope.prices = [];
		$scope.printeable = false;
	}

	$scope.addTrat = function(){
		var temp = {
			'nome' : $scope.nome,
			'desc' : $scope.desc,
			'preco':$scope.preco
		};

		$scope.prices.push(temp);
		$scope.nome = '';
		$scope.desc = '';
		$scope.preco = '';
	}
}]);




$(function() { 
    $("#btnSave").click(function() { 
        html2canvas($(".page"), {
            onrendered: function(canvas) {
                theCanvas = canvas;
                document.body.appendChild(canvas);

                // Convert and download as image 
                var theImg = Canvas2Image.saveAsPNG(canvas,595,842);
                $('canvas').remove();
                // Clean up 
                //document.body.removeChild(canvas);
            }
        });
    });
}); 