## 1.0.0
- General Initial Development
- Added command handler

## 1.1.0 
### - Added MongoDB Connection for future usage -

### - Commands Added (Ordered): - 
- **testCommand** - Acts only as a base for creating other commands
- **commands** - Lists all commands, descriptions, and usage(s)
- **change** - Changes theme of channels & roles
- **toxic** - Cycles a targeted user through all of the voice channels to get their attention
- **coryreact** - Reacts to a message, spelling out someone's name
- **stocks** - Allows user(s) to add and delete valid stock symbols to/from MongoDB
	-> This will be implemented into a stock ticker very soon

### - General - 
- Added auto-message deletion after 5 seconds for non- bot owner usage
- Added admin verification for multiple commands to restrict usage
- Bot posts any caught/uncaught exceptions to a text channel for debug, including time/date, invoker, & channel  

## 1.1.1
### - Added presence detection/handling/logging - 
- Anyone who plays League of Legends gets kicked from the server
- All presence updates are logged in a server Administration channel

## 1.1.2
### - WIP -
- Working on Bot info Command, can't figure out why it isn't working
- Testing Payload Messaging for Discord