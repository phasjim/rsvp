export class Guest {
  firstName: string;
  lastName: string;

  isAttending: boolean;
  entree: string;
}

export class MainGuest extends Guest {
  code: string;
  partyMembers: Guest[];
}
