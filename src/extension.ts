'use strict';

import {ExtensionContext} from 'vscode';
import {WordCounter} from './WordCounter';
import {WordCountController} from './WordCountController';

export function activate(context: ExtensionContext) {
    console.log("Congratulations: Your extension WordCount now installed");

    let wordCounter = new WordCounter();
    let controller = new WordCountController(wordCounter);

    context.subscriptions.push(wordCounter);
    context.subscriptions.push(controller);
}