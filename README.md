# Local Bot Logger
![badge](https://img.shields.io/github/license/Rushbycmd/Local-Bot-Logger?style=for-the-badge)![badge](https://img.shields.io/github/languages/code-size/Rushbycmd/Local-Bot-Logger?color=BLUE&style=for-the-badge)


LBL does not log tokens or private information, it only logs messages in a json file format locally. 
```json  
 {
    [messageId]: {
      "Timestamps": [message.createdAt.toISOString()],
      "Guild Name": [message.guild.name],
      "Guild ID": [message.guild.id],
      "Channel Name": [message.channel.name],
      "channel ID": [message.channel.id],
      "Author ID": [message.author.id],
      "Author Username": [message.author.username],
      "Message Content": [message.content],
    },
```
## Dependencies
Node.js, 
Libraries include FS, Discord
```env
export token=""
```

## Contributing

Pull requests are welcome. For major changes, please dm me on discord Rushuby#9413.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
