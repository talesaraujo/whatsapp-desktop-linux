import { BrowserWindow } from "electron";
import Module from "./module";

const FONT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

* {
    font-family: 'Inter', sans-serif !important;
}
`;

export default class FontModule extends Module {

    constructor(private readonly window: BrowserWindow) {
        super();
    }

    public override onLoad() {
        this.window.webContents.on('did-finish-load', () => {
            this.window.webContents.insertCSS(FONT_CSS);
        });
    }
}
