'use strict';

import {StatusBarAlignment, StatusBarItem, window, TextDocument} from 'vscode';

export class WordCounter {
    private _statusBarItem: StatusBarItem;

    public updateWordCount() {
        if (!this._statusBarItem) {
            this._statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);
        }

        let editor = window.activeTextEditor;
        if (!editor) {
            this._statusBarItem.hide();
            return;
        }

        let doc = editor.document;
        if (doc.languageId === 'markdown') {
            let wordCount = this._getWordCount(doc);
            
            this._statusBarItem.text = wordCount !== 1 ? `$(pencil) ${wordCount} Words` : '1 Word';
            this._statusBarItem.show();
        } else {
            this._statusBarItem.hide();
        }
    }

    public _getWordCount(doc: TextDocument) :number {
        let docContent = doc.getText();

        docContent = docContent.replace('/(< ([^>]+) <)/g', '').replace('/\s+/g', ' ')
        docContent = docContent.replace('/\s\s*/', '').replace('/\s\s*$/', '');

        let wordCount = 0;
        if (docContent != '') {
            wordCount = docContent.split(' ').length;
        }
        return wordCount;
    }

    dispose() {
        this._statusBarItem.dispose();
    }
}