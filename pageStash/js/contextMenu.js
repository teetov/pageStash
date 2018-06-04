
let storageName = "procrastinatorPages";

chrome.contextMenus
  .create({"id":"123", "title": "Postpone this article"
  , "contexts": ["page"], "onclick": onContextMenuClick});

function onContextMenuClick(info, tab) {
	addTabToPageStorage(tab);
}
 


