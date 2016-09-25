function AppCtrl($scope,$http){
	console.log("This is test function AppCtrl");

var refresh = function(){ //sama saja fungsi refresh()
		$http.get("/contactlist").success(function(response){
			console.log("i got a request received");
			$scope.contactlist = response;
			$scope.contact = ""; //membuat tulisan mjd kosong kembali
		});
	};

	refresh();

	$scope.addContact = function(){ //addContact => sesuai dg ng-click di index
		console.log($scope.contact);
		$http.post("/contactlist",$scope.contact).success(function(response){
			console.log(response);
			refresh();
		});
	};

	$scope.remove = function(id){  
		console.log(id)
		$http.delete("/contactlist/"+id).success(function(response){
			refresh();
		});
	}

	$scope.edit = function(id){
		/*console.log(id);*/
		
		$http.get("/contactlist/"+id).success(function(response){
			$scope.contact = response;
		})
	}

	$scope.update = function(){
		console.log($scope.contact._id); //di ambil dr post id
		$http.put("/contactlist/"+$scope.contact._id,$scope.contact).success(function(response){
			refresh();								//sama seperti yg post, $scope.contact diambil dr post contact semua
		})
	}

	$scope.clear = function(){
		$scope.contact = "";
	}

	/*$scope.contactlist = contactlist;*/
}

/*ng-app, ng-model, directives, {{ expression }}, ng-init, ng-repeat,
filter,orderBy

controller -- $scope -- view*/

var test = angular.module("testApp",['ngRoute']); //[] => jika menggunakan module lain,, testApp => di ng-app <html>

//custom directive templating

test.directive('headerTitle',function(){
	return{
		restrict    : 'E', //E = element, jika attribut menggunakan A
		templateUrl : 'header'
	}
});

//agar lebih rapi controller dimasukkan di directive
test.directive('tableTitle',function(){
	return{
		restrict 	: 'A',
		templateUrl : 'table',
		controller	: function($scope){
						$scope.daftar = [
							{kelompok : 'merah',jenis:'IOT',status:'diterima'},
							{kelompok: 'biru',jenis:'Web Development',status:'diterima'},
							{kelompok: 'kuning',jenis:'Android',status:'On process'}
						];
		}
	}
});

//factory
/*test.factory('factoryOrang',function($http){
	var factoryOrang = {};

	factoryOrang.getOrang =function(){
				return $http.get('data.php');
	}
	return factoryOrang;
});

test.directive('tableTitle',function(){
	return{
		restrict 	: 'A',
		templateUrl : 'table',
		controller	: function($scope,factoryOrang){
						factoryOrang.getOrang().success(function(hasil){ //factory => sperti fungsi di ambil dr atas
							$scope.data = hasil;						//utk membuat modular
						});
		}
	}
});*/



//isi table
/*test.controller("AngularCtrl",function($scope){
	$scope.daftar = [
		{kelompok : 'merah',jenis:'IOT',status:'diterima'},
		{kelompok: 'biru',jenis:'Web Development',status:'diterima'},
		{kelompok: 'kuning',jenis:'Android',status:'On process'}
	];
})*/


//route
test.config(function($routeProvider){
	
	$routeProvider
	.when("/tambahinfo",{
		templateUrl : 'public/form.ejs',
		controller 	: 'add'
	})
	.when("/coba",{
		templateUrl : 'header'
	})
	.otherwise({redirectTo : '/'});

});

/*function tambah($scope,$http){
	$http.get("/tambahinfo").success(function(){
		$scope.info = data.info;
	});
}*/