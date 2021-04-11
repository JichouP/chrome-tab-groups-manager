import { getTabGroups } from './chrome';

export const onCreated = async (tab: chrome.tabs.Tab): Promise<void> => {
  const { windowId } = tab;
  const tabGroups = await getTabGroups({ windowId });
  const defaultGroup = tabGroups.find((v) => v.title === 'default');
  if (defaultGroup === undefined) {
    // there is NOT 'default' tab group
  } else {
    // there is 'default' tab group
  }
};
