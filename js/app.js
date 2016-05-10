var MyApp = angular.module('MyApp', ['indexedDB']).config(function($interpolateProvider, $indexedDBProvider){
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
	$indexedDBProvider
	  .connection('myIndexedDB')
	  .upgradeDatabase(1, function(event, db, tx){
	    var objStore = db.createObjectStore('tratamentos', {keyPath: 'ssn'});
	    objStore.createIndex('nome_idx', 'nome', {unique: true});
	    objStore.createIndex('desc_idx', 'desc', {unique: false});
	    objStore.createIndex('preco_idx', 'preco', {unique: false});
	});
  });

var MyCtrl = MyApp.controller("MyCtrl",[ '$scope', '$http', '$indexedDB', '$sce', function($scope, $http, $indexedDB,$sce){
	$scope.initApp = function(){
		$scope.prices = [];
		$indexedDB.openStore('tratamentos', function(store){
      store.getAll().then(function(topics) { 
        $scope.temp = topics;
        angular.forEach($scope.temp, function(value, key){
			var temp = {
				'nome' : value.nome,
				'desc' : $sce.trustAsHtml(value.desc),
				'preco': value.preco
			}
			$scope.prices.push(temp);
		});
      });
    });

	}

	$scope.addTrat = function(){
		
		var temp = {
			'nome' : $scope.nome,
			'desc' : $sce.trustAsHtml($scope.desc),
			'preco': $scope.preco
		};
		$scope.prices.push(temp);

		$indexedDB.openStore('tratamentos', function(store){
	      store.insert({'ssn':$scope.prices.length,"nome": $scope.nome, "desc": $scope.desc, "preco": $scope.preco}).then(function (e) {
        	$scope.nome = '';
			$scope.desc = '';
			$scope.preco = '';
  		  });
   		});

	}

	$scope.clear = function(){
		$indexedDB.openStore('tratamentos', function(store){
      store.clear().then(function(){
        $scope.prices = [];
      });
    });
	}
}]);




$(function() { 
    $("#btnSave").click(function() { 
        html2canvas($(".page"), {
        	allowTaint: true,
       		logging:true,
            onrendered: function(canvas) {
                theCanvas = canvas;
                var mbody = document.getElementById('modal-body');
                $('canvas').remove();
                mbody.appendChild(canvas);
                $('#myModal').modal('show');
            }
        });
    });
}); 
