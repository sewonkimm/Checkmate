import React, { ReactElement } from 'react';
import { DiffEditor } from '@monaco-editor/react';

type PropsType = {
  origin: string;
  input: string;
};

const Diff = ({ origin, input }: PropsType): ReactElement => {
  const options = {
    acceptSuggestionOnCommitCharacter: false,
    acceptSuggestionOnEnter: 'off',
    accessibilitySupport: 'auto',
    autoIndent: false,
    automaticLayout: true,
    codeLens: false,
    colorDecorators: true,
    contextmenu: true,
    cursorBlinking: 'blink',
    cursorSmoothCaretAnimation: false,
    cursorStyle: 'line',
    disableLayerHinting: false,
    disableMonospaceOptimizations: false,
    dragAndDrop: false,
    fixedOverflowWidgets: false,
    folding: false,
    foldingStrategy: 'auto',
    fontSize: 16,
    fontLigatures: false,
    formatOnPaste: false,
    formatOnType: false,
    hideCursorInOverviewRuler: false,
    highlightActiveIndentGuide: false,
    horizontal: 'hidden',
    letterSpacing: 1.3,
    lineHeight: 25,
    links: false,
    mouseWheelZoom: true,
    multiCursorMergeOverlapping: false,
    quickSuggestions: false,
    readOnly: true,
    renderControlCharacters: false,
    renderFinalNewline: false,
    renderIndentGuides: true,
    renderLineHighlight: 'all',
    renderWhitespace: 'none',
    revealHorizontalRightPadding: 30,
    roundedSelection: true,
    rulers: [],
    scrollBeyondLastColumn: 5,
    scrollBeyondLastLine: true,
    selectOnLineNumbers: true,
    selectionClipboard: true,
    selectionHighlight: true,
    showFoldingControls: 'mouseover',
    smoothScrolling: true,
    snippetSuggestions: 'none',
    suggestOnTriggerCharacters: true,
    wordBasedSuggestions: false,
    wordSeparators: '~!@#$%^&*()-=+[{]}|;:\'",.<>/?',
    wordWrap: 'on',
    wordWrapBreakAfterCharacters: '\t})]?|&,;',
    wordWrapBreakBeforeCharacters: '{([+',
    wordWrapBreakObtrusiveCharacters: '.',
    wordWrapColumn: 80,
    wordWrapMinified: true,
    wrappingIndent: 'none',
  };

  return <DiffEditor height="350px" language="markdown" options={options} original={origin} modified={input} />;
};

export default Diff;
