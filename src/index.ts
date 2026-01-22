import { app } from 'electron';
import WhatsApp from './whatsapp';

// Configurar nome da aplicação para notificações no Linux
app.setName('WhatsApp Desktop');

if (!app.requestSingleInstanceLock()) {
    app.quit();
    process.exit();
}

app.whenReady().then(() => new WhatsApp().init());
