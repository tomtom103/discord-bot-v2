# Discord.js v13 Bot Template

## Managing bot process with PM2

View the [Discord Guide](https://discordjs.guide/improving-dev-environment/pm2.html) for more information

```bash
npm install --global pm2
```

Starting the app:

```bash
pm2 start ./src/index.js
```

### Additional notes

The `pm2 start` script allows for more optional command-line arguments

- `--name`: This allows you to set the name of your process when listing it up with `pm2 list` or `pm2 monit`
- `--watch`: This option will automatically restart your process as soon as a file change is detected, which can be useful for development environments

Read the full documentation [here](https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/)