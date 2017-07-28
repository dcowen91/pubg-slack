class UsersMap
{
	userCollection: {[userId: string]: string};

	constructor()
	{
		this.userCollection = {};
	}

	addUser(userId: string, userName: string): void
	{
		// console.log('adding ' + userId + ' : ' + userName);
		this.userCollection[userId] = userName;
	}

	getUser(userId: string): string
	{
		return this.userCollection[userId];
	}
}

export default UsersMap;