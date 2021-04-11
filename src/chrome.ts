export const getCurrentWindow = async (): Promise<chrome.windows.Window> =>
  new Promise((resolve) => {
    chrome.windows.getCurrent(resolve);
  });

export const getTabGroups = async (query: chrome.tabGroups.QueryInfo): Promise<chrome.tabGroups.TabGroup[]> =>
  new Promise((resolve) => {
    chrome.tabGroups.query(query, resolve);
  });

export const getTabs = async (query: chrome.tabs.QueryInfo): Promise<chrome.tabs.Tab[]> =>
  new Promise((resolve) => {
    chrome.tabs.query(query, resolve);
  });
