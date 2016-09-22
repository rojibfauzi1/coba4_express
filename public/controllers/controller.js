function AppCtrl($scope,$http){
	console.log("This is test function AppCtrl");

	$http.get("/contactlist").success(function(response){
		console.log("i got a request received");
		$scope.contactlist = response;
	});

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
})

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
		templateUrl : '/form.ejs',
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