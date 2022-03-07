export class SAddres {
  country: string = '';
  city: string = '';
  street: string = '';
  house: string = '';
  mailIndex: string = '';
}

export class Passport {
  name: string = '';
  familia: string = '';
  nasab: string = '';
  appealForm: string = '';
  academicDegree: string = '';
  academicTitle: string = '';
  position: string = '';
  organisation: string = '';
  department: string = '';
  organisationAddress: SAddres = new SAddres();
  scientificInterestsArea: string = '';
  language: string = '';

  constructor(lang: string) {
    this.language = lang
  }
}

export class AuthorId {
  idname: string = '';
  id: string = '';
}

export class Telephon {
  number: string = '';
  type: string = '';
}

export class User {
  _id: string = '';
  userName: string = '';
  password: string = '';
  passports: Passport[] = [];
  authorIds: string = '';
  mainEmail: string = '';
  alterEmail: string = '';
  telephons: Telephon[] = [];
  fax: string = '';

  constructor() {
    this.passports = [new Passport('ru'), new Passport('en')]
  }
}
