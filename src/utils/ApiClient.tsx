export type User = {
  readonly name: string;
  readonly age: number;
  readonly nick: string;
  readonly friends: number;
  readonly sur: string;
  readonly bro: number;
};

export class HttpClient {
  private static readonly users: User[] = [
    {
      name: 'Matthew',
      age: 15,
      nick: 'string',
      friends: 2,
      sur: 'string',
      bro: 4,
      par: 'string',
      sdr: 2,
      re: 'string',
      fs: 4,
    },
    {
      name: 'Alexander',
      age: 32,
      nick: 'string',
      friends: 2,
      sur: 'string',
      bro: 4,
      par: 'string',
      sdr: 2,
      re: 'string',
      fs: 4,
    },
    {
      name: 'Samuel',
      age: 22,
      nick: 'string',
      friends: 2,
      sur: 'string',
      bro: 4,
      par: 'string',
      sdr: 2,
      re: 'string',
      fs: 4,
    },
  ];
  public static async fetchUsers(): Promise<User[]> {
    return Promise.resolve(HttpClient.users);
  }
}
