
const STORAGE_NAME = "procrastinatorPages";

let tabsObject = {};

function addTabToPageStorage(tab, callback) {
  chrome.storage.sync.get(STORAGE_NAME, function(items) {
	  
    console.log(items);
	  
	let pages = items[STORAGE_NAME];
	  
	let namedObj = {};
	  
	if(pages == undefined) {
	  pages = {};	
    } 
	namedObj[STORAGE_NAME] = pages;
  
    pages[tab.url] = createTabObject(tab);
	  
	chrome.storage.sync.set(namedObj, function() {});
		
	if(callback != undefined) {
		callback();
	}
  });
}

function createTabObject(tab) {
	let result = {};
	
	result.title = tab.title;
	result.creationTime = new Date().getTime();
	
	return result;
}

function removeTabFromPageStorage(tabUrl, callback) {

	delete tabsObject[tabUrl];
	let tempObj = {};
	tempObj[STORAGE_NAME] = tabsObject;
	
	chrome.storage.sync.set(tempObj, function() {});
	
	
	if(callback != undefined) {
		callback();
	}
}

function updateTabInStorage(tabUrl, newPropObj, callback) {
	let obj = tabsObject[tabUrl];
	
	for(let key in newPropObj) {
		obj[key] = newPropObj[key];
	}
	
	let tempObj = {};
	tempObj[STORAGE_NAME] = tabsObject;
	
	chrome.storage.sync.set(tempObj, function() {});
	
	if(callback != undefined) {
		callback();
	}
}

function extractTabsFromStorage(callback) {
	
	chrome.storage.sync.get(STORAGE_NAME, function(items) {
		let tabs = items[STORAGE_NAME];
		
		for(let tab in tabs) {
			tabsObject[tab] = tabs[tab];
		}
		
		console.log(tabsObject);
		
		if(callback != undefined) {
			callback();
		}
	});
}


