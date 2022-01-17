const Enmap = require('enmap');

export const defaultSettings = new Enmap({
    name: "settings",
    fetchAll: false,
    autoFetch: true,
    cloneLevel: 'deep',
    autoEnsure: {
        prefix: "!",
        modLogChannel: "mod-log",
        modRole: "Moderator",
        adminRole: "Administrator",
        welcomeChannel: "welcome",
        welcomeMessage: "Say hello to {{user}}, everyone!"
    }
});