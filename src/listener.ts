import {
  addTabToGroup,
  getCurrentWindow,
  getTab,
  getTabGroups,
  getTabs,
  moveTab,
  updateTabGroup,
} from './chrome';

export const onTabCreated = async (tab: chrome.tabs.Tab): Promise<void> => {
  const { id, openerTabId } = tab;
  const { TAB_GROUP_ID_NONE } = chrome.tabGroups;
  if (!id) return;

  if (openerTabId) {
    const openerGroupId = (await getTab(openerTabId)).groupId;
    if (openerGroupId === TAB_GROUP_ID_NONE) {
      return;
    }
    await addTabToGroup([id], openerGroupId);
    return;
  }

  await sleep(100);
  if ((await getTab(id)).groupId === chrome.tabGroups.TAB_GROUP_ID_NONE) {
    await addTabToGroup([id]);
    return;
  }
  return;
};

export const onTabUpdated = async (
  tabId: number,
  changeInfo: chrome.tabs.TabChangeInfo
): Promise<void> => {
  const { TAB_GROUP_ID_NONE } = chrome.tabGroups;
  if (changeInfo.groupId === TAB_GROUP_ID_NONE) {
    await sleep(100);
    getTab(tabId)
      .then((tab) => {
        if (!tab) return;
        if (tab.groupId === TAB_GROUP_ID_NONE) {
          addTabToGroup([tabId]);
        }
      })
      .catch();
  }
  return;
};

export const onCommand = async (command: string): Promise<void> => {
  switch (command) {
    case 'move_left': {
      const windowId = (await getCurrentWindow()).id;
      const tabs = await getTabs({ active: true, windowId });
      if (tabs.length === 0) return;
      const tab = tabs[0];
      const tabId = tab.id;
      if (!tabId) return;
      await moveTab(tabId, { index: Math.max(tab.index - 1, 0), windowId });
      return;
    }
    case 'move_right': {
      const windowId = (await getCurrentWindow()).id;
      const tabs = await getTabs({ active: true, windowId });
      if (tabs.length === 0) return;
      const tab = tabs[0];
      const tabId = tab.id;
      if (!tabId) return;
      await moveTab(tabId, { index: tab.index + 1, windowId });
      return;
    }
    case 'new_group': {
      const windowId = (await getCurrentWindow()).id;
      const tabs = await getTabs({ active: true, windowId });
      if (tabs.length === 0) return;
      const tab = tabs[0];
      const tabId = tab.id;
      if (!tabId) return;
      await addTabToGroup([tabId]);
      return;
    }
    case 'collapse': {
      const windowId = (await getCurrentWindow()).id;
      const tabs = await getTabs({ active: true, windowId });
      if (tabs.length === 0) return;
      const tab = tabs[0];
      (await getTabGroups({ windowId, collapsed: false }))
        .filter((v) => v.id !== tab.groupId)
        .forEach(async (tabGroup) => {
          await updateTabGroup(tabGroup.id, { collapsed: true });
        });
      return;
    }
  }
};

export const init = async (): Promise<void> => {
  const isolatedTabs = (await getTabs({})).filter(
    (v) => v.groupId === chrome.tabGroups.TAB_GROUP_ID_NONE
  );
  if (isolatedTabs.length === 0) return;

  new Set<number>(isolatedTabs.map((v) => v.windowId)).forEach((windowId) => {
    addTabToGroup(
      isolatedTabs
        .filter((v) => v.windowId === windowId)
        .map((v) => v.id)
        .filter((v) => v) as number[],
      undefined,
      windowId
    );
  });
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
