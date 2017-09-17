import { RtmClient, RTM_EVENTS, CLIENT_EVENTS  } from '@slack/client';
import UsersMap from './UsersMap';
import CommandHandler from './CommandHandler';

class SlackAdapter
{
	private botUserid: string;
	private client: RtmClient;
	private usersMap: UsersMap;
	private commandHandler: CommandHandler;

	constructor(client: RtmClient, usersMap: UsersMap, commandHandler: CommandHandler)
	{
		this.client = client;
		this.usersMap = usersMap;
		this.commandHandler = commandHandler;
	}
	start()
	{
		console.log('now listening');

		this.client.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
			this.botUserid = `<@${rtmStartData.self.id}>`;
			console.log('bot id set as: ' + this.botUserid);
		});


		this.client.on(RTM_EVENTS.MESSAGE, (message) =>  {
			const messageText: string[] = !!message.text ? message.text.split(' ') : [];
			const isMessageToBot = messageText[0] === this.botUserid;
			if (isMessageToBot && this.commandHandler.isValidCommand(messageText[1]))
			{
				const command = messageText[1];
				const target = messageText[2];

				if (!command || command.toLowerCase() === 'help')
				{
					this.client.sendMessage(`Usage:
\`@pubgstatsbot [command] [pubg_nickname]\`
	If you have trouble remembering someone's PUBG nickname, use the addUser command:

\`@pubgstatsbot addUser [@SlackUser] [pubg_nickname]\`
\`@pubgstatsbot [command] [@SlackUser]\`

Commands:
\`rating, kdr, wins, top10s, bestrating, teamwork, vehicle, records, timealive, distance, headshot, health, details, random, help\``, message.channel);
				}
				else if (command.toLowerCase() === 'adduser')
				{
					if (!messageText[2] || !messageText[3])
					{
						this.client.sendMessage('USAGE:\n@pubgstatsbot adduser [@SlackUser] [pubg_nickname]', message.channel);
					}
					else
					{
						const nickName = messageText[3];
						this.usersMap.addUser( target, nickName);
						this.client.sendMessage('user added!', message.channel);
						return;
					}
				}
				else if (!messageText[2])
				{
					this.client.sendMessage('USAGE:\n@pubgstatsbot [command] [pubg_nickname]', message.channel);
				}
				else
				{
					const userName = this.usersMap.getUser(target) || target || '<@' + message.user + '>';
					this.commandHandler.handleCommand(userName, command).then((result) => {
						this.client.sendMessage(result, message.channel);
					});
				}
			}
			else if (isMessageToBot)
			{
				this.client.sendMessage('Usage:\n`@pubgstatsbot [command] [pubg_nickname]`\n`@pubgstatsbot help` to learn more', message.channel);
			}
		});
		this.client.start();
	}
}
export default SlackAdapter;