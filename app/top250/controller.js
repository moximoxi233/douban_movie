
(function (angular) {
	'use strict';
	//创建 正在热映 模块


	var module=angular.module('movie.top250', ['ngRoute','movie.service.http']);
	//路由
	module.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/top250/:page', {
			templateUrl: 'top250/view.html',
			controller: 'top250Ctrl'
		});
	}]);
	//控制器
	module.controller('top250Ctrl', ['$scope',
		'$route',
		'$routeParams',
		'HttpService',function($scope,$route,$routeParams,HttpService) {
			//1.设计暴露的数据   2.设计暴露的行为
			var  page=parseInt($routeParams.page);
			var count=5;
			var start=(page-1)*count;

			$scope.currentPage=page;
			$scope.subjects=[];
			$scope.message='';
			$scope.totalCount=0;
			$scope.totalPages=0
			$scope.flag=true
			$scope.title=''
			HttpService.jsonp('https://api.douban.com/v2/movie/top250?apikey=0b2bdeda43b5688921839c8ecb20399b',{start:start,count:count},function (data) {
				$scope.title=data.title
				$scope.subjects=data.subjects

				$scope.totalCount=data.total;
				$scope.totalPages=Math.ceil($scope.totalCount/count)

				$scope.$apply('totalCount')

				//$apply的作用： 就是让指定的表达式重新同步
				$scope.$apply('subjects')
				$scope.flag=false;
				$scope.$apply('flag')

			});
			//控制页面
			$scope.selectPage=function (page) {
				if(page>=1&&page<=$scope.totalPages){
					$route.updateParams({page:page})

				}
			}

		}]);
})(angular);
