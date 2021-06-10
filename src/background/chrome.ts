export const getCurrentWindow = async (): Promise<chrome.windows.Window> =>
  new Promise((resolve) => {
    chrome.windows.getCurrent(resolve);
  });

export const getTabGroups = async (
  query: chrome.tabGroups.QueryInfo
): Promise<chrome.tabGroups.TabGroup[]> =>
  new Promise((resolve) => {
    chrome.tabGroups.query(query, resolve);
  });

export const updateTabGroup = async (
  groupId: number,
  updateProperties: chrome.tabGroups.UpdateProperties
): Promise<chrome.tabGroups.TabGroup> =>
  new Promise((resolve) => {
    chrome.tabGroups.update(groupId, updateProperties, resolve);
  });

/**
 * @param tabIds number
 * @returns groupId
 */
export const addTabToGroup = (
  tabIds: number[],
  groupId?: number,
  windowId?: number
): Promise<number> =>
  new Promise((resolve) => {
    chrome.tabs.group(
      windowId
        ? { tabIds, groupId, createProperties: { windowId } }
        : { tabIds, groupId },
      resolve
    );
  });

export const getTabs = async (
  query: chrome.tabs.QueryInfo
): Promise<chrome.tabs.Tab[]> =>
  new Promise((resolve) => {
    chrome.tabs.query(query, resolve);
  });

export const getTab = async (tabId: number): Promise<chrome.tabs.Tab> =>
  new Promise((resolve) => {
    chrome.tabs.get(tabId, resolve);
  });

export const moveTab = async (
  tabId: number,
  moveProperties: chrome.tabs.MoveProperties
): Promise<chrome.tabs.Tab> =>
  new Promise((resolve) => {
    chrome.tabs.move(tabId, moveProperties, resolve);
  });

export const checkLastError = (): void => {
  const err = chrome.runtime.lastError;
  if (err) {
    return console.error(err);
  }
};
