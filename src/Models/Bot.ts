import UsersMap from './UsersMap';
import CommandAdapter from './CommandAdapter';
import SlackAdapter from './SlackAdapter';

class Bot
{
	usersMap: UsersMap;
	commandAdapter: CommandAdapter;
	slackAdapter: SlackAdapter;

	constructor(map: UsersMap, commandAdapter: CommandAdapter, slackAdapter: SlackAdapter)
	{
		// TODO do we need usersMap here?
		this.usersMap = map;
		this.commandAdapter = commandAdapter;
		this.slackAdapter = slackAdapter;
	}

	start()
	{
		this.slackAdapter.start(this.handleInput);
	}

	handleInput(userId: string, command: string)
	{
		console.log('sup');
		console.log(this);
		let userName = this.usersMap.getUser(userId);
		if (!userName)
		{
			console.log('no match');
			userName = this.slackAdapter.promptForUserName();
			// TODO this.usersMap.addUser(userId, userName);
		}
		else
		{
			const result = this.commandAdapter.handleCommand(userName, command);
			console.log(result);
			// TODO slackAdapter send response
		}
	}
}

export default Bot;