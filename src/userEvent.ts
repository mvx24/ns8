class UserEvent {
  email: string;
  type: string;
  created: Date;

  constructor({
    email,
    type,
    created,
  }: {
    email: string;
    type: string;
    created: string | Date | undefined;
  }) {
    this.email = email;
    this.type = type;
    if (!created) {
      this.created = new Date();
    } else {
      this.created = typeof created === 'string' ? new Date(created) : created;
    }
  }

  validate(): string | null {
    if (!this.email) {
      return 'Missing email';
    }
    if (!this.type) {
      return 'Missing type';
    }
    return null;
  }
}

export default UserEvent;
