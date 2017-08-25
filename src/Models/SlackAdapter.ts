import {RtmClient, RTM_EVENTS} from '@slack/client';
import UsersMap from './UsersMap';
import CommandAdapter from './CommandAdapter';

class SlackAdapter
{
	// TODO don't hard code this
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
	start()
	{
		this.client.on(RTM_EVENTS.MESSAGE, (message) =>  {
			const messageText: string[] = !!message.text ? message.text.split(' ') : [];
			const isMessageToBot = messageText[0] === this.botUserid;
			// TODO do more / proper validation here
			if (isMessageToBot && this.commandAdapter.isValidCommand(messageText[1]))
			// if (messageText[0] === this.botUserid && messageText.length <= 3)
			{
				const command = messageText[1];
				const target = messageText[2] || '<@' + message.user + '>';

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
					const userName = this.usersMap.getUser(target) || target;
					// if (!userName)
					// {
					// 	// this.client.sendMessage('pubg user not found for ' + target + '. Please have the user call the addUser command', message.channel);
					// }
					// else
					// {
						// console.log('querying for ' + userName);
						this.commandAdapter.handleCommand(userName, command).then((result) => {
							console.log(result);
							this.client.sendMessage(result, message.channel);
						});
					// }

				}
			}
			else
			{
				console.log('dafuq');
			}
		});

		this.client.start();
		console.log('now running');
	}

	promptForUserName(): string
	{
		return 'gettingName';
	}
}
export default SlackAdapter;