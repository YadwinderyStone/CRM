import { AngularEditorConfig } from "@kolkov/angular-editor";

export const EditorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '200px',
    minHeight: '200px',
    toolbarHiddenButtons: [
        [
            'insertImage',
            'insertVideo',
        ]
    ]
};