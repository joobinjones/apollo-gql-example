interface CreateUserInput {
  name: string;
  email: string;
  age: number | null;
}

interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

type UsersElement = User | undefined | null;
type Users = Array<UsersElement>;

export { CreateUserInput, User, Users, UsersElement };
