import {RtmClient, RTM_EVENTS} from '@slack/client';
import UsersMap from './UsersMap';
import CommandAdapter from './CommandAdapter';

class SlackAdapter
{
	private botUserid: string = '<@U5Z8ER1DG>';

	client: RtmClient;
	usersMap: UsersMap;
	commandAdapter: CommandAdapter;

	constructor(client: RtmClient, usersMap: UsersMap, commandAdapter: CommandAdapter)
	{
		this.client = client;
		this.usersMap = usersMap;
		this.commandAdapter = commandAdapter;
	}
	start(func: (a: string, b: string) => void)
	{
		this.client.on(RTM_EVENTS.MESSAGE, (message) =>  {
			const messageText: string[] = !!message.text ? message.text.split(' ') : [];
			// console.log(message);
			console.log(messageText);
			if (messageText[0] === this.botUserid && messageText.length <= 3)
			{
				const command = messageText[1];
				const target = messageText[2] || '<@' + message.user + '>';

				console.log('command: ' + command);
				console.log('user: ' + target);
				if (!command || command.toLowerCase() === 'help')
				{
					this.client.sendMessage('USAGE:\n@pubgstatsbot help\n@pubgstatsbot adduser [your_pubg_nickName]\n@pubgstatsbot [stats|kdr|rating|wins|top10] [@SlackUser]', message.channel);
				}
				else if (command.toLowerCase() === 'adduser')
				{
					if (!messageText[2])
					{
						this.client.sendMessage('USAGE:\n@pubgstatsbot adduser [your_pubg_nickName]', message.channel);
					}
					this.usersMap.addUser('<@' + message.user + '>', target);
					this.client.sendMessage('user added!', message.channel);
					return;
				}
				else
				{
					const userName = this.usersMap.getUser(target);
					if (!userName)
					{
						this.client.sendMessage('pubg user not found for ' + target + '. Please have the user call the addUser command', message.channel);
					}
					else
					{
						console.log('querying for ' + userName);
						this.commandAdapter.handleCommand(userName, command).then((result) => {
							console.log(result);
							this.client.sendMessage(result, message.channel);
						});
					}
					// func(target, command);
				}
			}
			// TODO remove this
			else
			{
				console.log(func);
			}
			// TODO call func and also actually parse this into a playername and a command
		});

		this.client.start();
		console.log('now running');
		// TODO call func
	}

	promptForUserName(): string
	{
		return 'gettingName';
	}
}
export default SlackAdapter;