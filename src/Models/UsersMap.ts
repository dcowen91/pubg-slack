class UsersMap
{
	// maps a slack userId to a pubg userName
	userCollection: {[userId: string]: string};

	constructor()
	{
		this.userCollection = {};
	}

	addUser(userId: string, userName: string): void
	{
		this.userCollection[userId] = userName;
	}

	getUser(userId: string): string
	{
		return this.userCollection[userId];
	}
}

export default UsersMap;