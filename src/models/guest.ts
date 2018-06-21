export class Guest {
  guestfirstname: string;
  guestlastname: string;
  
  partyfirstname: string;
  partylastname: string;

  code: string;

  isAttending: boolean;
  entree: string;
}

export class PrimaryPartyMember {
  partyfirstname: string;
  partylastname: string;
  code: string;

  partymembers: Guest[];

  constructor(guest: Guest) {
    this.partyfirstname = guest.partyfirstname;
    this.partylastname = guest.partylastname;
    this.code = guest.code;
    
    this.partymembers = [];
  }
}
