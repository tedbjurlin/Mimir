import React, {useCallback, useEffect, useRef, useState} from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';

export const TextEditor = () => {
    return <div ref={editor}></div>
}