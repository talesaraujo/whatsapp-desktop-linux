// Base dictionary: every other locale must provide the same keys.
// Plural keys use the Intl.PluralRules categories as suffixes (".one", ".other", ...).
const en = {
    "tray.minimize": "Minimize to tray",
    "tray.show": "Show WhatsApp",
    "tray.quit": "Quit WhatsApp",
    "tray.unread.one": "{count} unread chat",
    "tray.unread.other": "{count} unread chats"
};

export type Messages = typeof en;
export default en;
