import { onCommand, onTabCreated, onTabUpdated } from './listener';

chrome.commands.onCommand.addListener(onCommand);
chrome.tabs.onCreated.addListener(onTabCreated);
chrome.tabs.onUpdated.addListener(onTabUpdated);
