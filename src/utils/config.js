/**
 * Configurations related to the Discord Bot.
 */

/**
 * Per-server configurations
 */
export const defaultClientSettings = new Enmap({
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

/**
 * Attach the default settings to the client to allow for modular bot setup
 */
client.settings = defaultClientSettings;