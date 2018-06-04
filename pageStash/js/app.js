let app = angular.module("procrastinator", ['angular-toArrayFilter']);

console.log("angular");


app.controller("procController", function($scope) {
	//header
	$scope.mess = "Your stash";
	
	//section of items list 
	$scope.tabs = tabsObject;
	extractTabsFromStorage(function() {$scope.$apply()});
	
	$scope.removeAndOpen = function(tabUrl) {
		clearEditArea(tabUrl);
		removeTabFromPageStorage(tabUrl, function() {openNewPage(tabUrl);});
	};
	
	$scope.convertTime = function(time) {
		return new Date().setTime(time);
	};
	
	$scope.remove = function(tabUrl) {
		clearEditArea(tabUrl);
		removeTabFromPageStorage(tabUrl);
	};
	
	$scope.emptyTabsObj = function() {
		for(let key in $scope.tabs) {
			return false;
		}
		return true;
	};
	
	function clearEditArea(tabUrl) {
		if($scope.editableItem && tabUrl === $scope.editableItem.$key) {
			$scope.editableItem = null;
			if(!$scope.disableTitleEditPane) {
				$scope.switchTitleEditPane();
			}
		}
	}
	
	//section of menu controler
	$scope.showMenu = false;
	
	$scope.switchMenu = function() {
		$scope.showMenu = !$scope.showMenu;
	};
	
	//section of title editing
	$scope.disableTitleEditPane = true;
	
	$scope.switchTitleEditPane = function() {
		$scope.disableTitleEditPane = !$scope.disableTitleEditPane;
	};
	
	$scope.editableItem;
	
	$scope.setEditableTitle = function(item) {
		$scope.switchTitleEditPane();
		
		if($scope.disableTitleEditPane) {
	        updateTabInStorage(item.$key, {"title": item.title});
			$scope.editableItem = null;
			
		} else {
			$scope.editableItem = item;
		}
		
	}
	
	//items order and filters
	$scope.orderOptions = [
		{
			name: "time",
			value: "creationTime"
		},
		{
			name: "title",
			value: "title"
		}
	];
	
	$scope.filterExp = "";
	
	$scope.reverse = true;
	
	$scope.since = since;
	
	$scope.order = $scope.orderOptions[0].value;
	
	$scope.itemConter = function() {
		if($scope.emptyTabsObj()) {
			return "";
		}
		
		let counter = 0;
		for(let key in tabsObject) {
			counter++;
		}
		
		return "(" + counter + " pages)";
	}
	
	// console.log($scope.tabs);
});

function openNewPage(tabUrl) {
	window.open(tabUrl);
}

//calculate how many time has passed
function since(time) {
	let interval = Math.floor((new Date().getTime() - time) / 1000);
	let result = "";
	
	let day = Math.floor(interval / 86400);
	result += day > 0 ? day + " days " : "";
	
	interval %= 86400;
	
	let hour = Math.floor(interval / 3600);
	result += hour > 0 ? hour + " hours " : "";
	
	interval %= 3600;
	
	if (day > 7) {
		return result;
	}
		
	let min =  Math.floor(interval / 60);
	result += min > 0 ? min + " minutes " : "";
	
	if(day > 0) {		
		return result;
	}
	
	interval %= 60;
	
	let second = Math.floor(interval);
	result += second > 0 ? second + " seconds " : "";
	
	if(! result) {
		return "just right now";
	}
	
	return result + " ago";
}



