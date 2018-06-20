export class Guest {
  guestfirstname: string;
  guestlastname: string;
  
  partyfirstname: string;
  partylastname: string;

  code: string;

  isAttending: boolean;
  entree: string;
}

export class PrimaryPartyMember extends Guest {
  partymembers: Guest[] = [];
}
