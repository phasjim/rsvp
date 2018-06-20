export class Guest {
  firstName: string;
  lastName: string;
}

export class MainGuest extends Guest {
  code: string;
  partyMembers: Guest[];
}
