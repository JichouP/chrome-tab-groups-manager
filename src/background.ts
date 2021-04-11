import { onCommand } from './commands';
import { onCreated } from './tabs';

chrome.commands.onCommand.addListener(onCommand);
chrome.tabs.onCreated.addListener(onCreated);
