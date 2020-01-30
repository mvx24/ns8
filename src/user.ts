import { validate } from 'isemail';

class User {
  email: string; // required
  password: string; // required
  phoneNumber: string; // optional with pattern ###-###-####

  constructor({
    email,
    password,
    phoneNumber,
  }: {
    email: string;
    password: string;
    phoneNumber: string | undefined;
  }) {
    this.email = email;
    this.password = password;
    this.phoneNumber = phoneNumber;
  }

  validate(): string | null {
    if (!this.email) {
      return 'Email is missing';
    }
    if (!validate(this.email)) {
      return 'Invalid email address';
    }
    if (!this.password) {
      return 'Password is missing';
    }
    if (this.phoneNumber && !/^\d{3}-\d{3}-\d{4}$/.test(this.phoneNumber)) {
      return 'Invalid phone number';
    }
    return null;
  }
}

export default User;
