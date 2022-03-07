import {Component, OnInit} from '@angular/core';
import {LocaleService} from "../../services/locale.service";
import {LocaleProp} from "../../types/locale-prop";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ACADEMIC_DEGREE} from "../../const/academic-degree";
import {SignInService} from "../../services/sign-in.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthGuard} from "../../guard/auth-guard";
import {ConfigLoadGuard} from "../../guard/config-load-guard";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  props: LocaleProp | null = {};
  mainEmail = new FormControl('', [Validators.required, Validators.email]);
  alterEmail = new FormControl('', [Validators.email]);
  userName = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  password1 = new FormControl('', [Validators.required]);
  mobTel = new FormControl('');
  homeTel = new FormControl('');
  workTel = new FormControl('');
  fax = new FormControl('');
  loginForm = new FormGroup({
    mainEmail: this.mainEmail,
    userName: this.userName,
    password: this.password,
    password1: this.password1,
    fax: this.fax,
    alterEmail: this.alterEmail
  });

  name = new FormControl('', [Validators.required])
  familia = new FormControl('', [Validators.required])
  nasab = new FormControl('', [Validators.required])
  appealForm = new FormControl('')
  academicDegree = new FormControl('', [Validators.required])
  academicTitle = new FormControl('', [Validators.required])
  position = new FormControl('', [Validators.required])
  organisation = new FormControl('', [Validators.required])
  department = new FormControl('', [Validators.required])
  scientificInterestsArea = new FormControl('', [Validators.required])
  country = new FormControl('', [Validators.required])
  city = new FormControl('', [Validators.required])
  street = new FormControl('', [Validators.required])
  house = new FormControl('', [Validators.required])
  mailIndex = new FormControl('', [Validators.required])
  name1 = new FormControl('', [Validators.required])
  familia1 = new FormControl('', [Validators.required])
  nasab1 = new FormControl('', [Validators.required])
  appealForm1 = new FormControl('')
  academicDegree1 = new FormControl('', [Validators.required])
  academicTitle1 = new FormControl('', [Validators.required])
  position1 = new FormControl('', [Validators.required])
  organisation1 = new FormControl('', [Validators.required])
  department1 = new FormControl('', [Validators.required])
  scientificInterestsArea1 = new FormControl('', [Validators.required])
  country1 = new FormControl('', [Validators.required])
  city1 = new FormControl('', [Validators.required])
  street1 = new FormControl('', [Validators.required])
  house1 = new FormControl('', [Validators.required])
  mailIndex1 = new FormControl('', [Validators.required])
  phones = new FormGroup({
    mobTel: this.mobTel,
    homeTel: this.homeTel,
    workTel: this.workTel
  })
  address = new FormGroup({
    country: this.country,
    city: this.city,
    street: this.street,
    house: this.house,
    mailIndex: this.mailIndex,
  });
  address1 = new FormGroup({
    country: this.country1,
    city: this.city1,
    street: this.street1,
    house: this.house1,
    mailIndex: this.mailIndex1,
  });
  passportForm = new FormGroup({
    name: this.name,
    familia: this.familia,
    nasab: this.nasab,
    appealForm: this.appealForm,
    academicDegree: this.academicDegree,
    academicTitle: this.academicTitle,
    position: this.position,
    organisation: this.organisation,
    department: this.department,
    organisationAddress: this.address,
    scientificInterestsArea: this.scientificInterestsArea
  });
  passportForm1 = new FormGroup({
    name: this.name1,
    familia: this.familia1,
    nasab: this.nasab1,
    appealForm: this.appealForm1,
    academicDegree: this.academicDegree1,
    academicTitle: this.academicTitle1,
    position: this.position1,
    organisation: this.organisation1,
    department: this.department1,
    organisationAddress: this.address1,
    scientificInterestsArea: this.scientificInterestsArea1
  });
  degrees = ACADEMIC_DEGREE;
  appealForms = ['-', 'уважаемый', 'уважаемая']
  acadTitles = ['без звания', 'доцент', 'профессор'];
  ID_SERVERS = [
    {name: ' ORCID', href: 'http://orcid.org/', controlName: 'orcId', hint: 'пример: 0000-0002-8242-2295'},
    {name: ' Publons', href: 'https://publons.com/researcher/', controlName: 'publonId', hint: 'пример: 1431263'},
    {
      name: ' ResearcherID (WoS)',
      href: 'http://www.researcherid.com/rid/',
      controlName: 'researcherId',
      hint: 'пример: G-3365-2013'
    },
    {
      name: ' Scopus ID',
      href: 'https://www.scopus.com/authid/detail.uri?authorId=',
      controlName: 'scopusId',
      hint: 'пример: 57190124706'
    },
    {
      name: ' РИНЦ AuthorID',
      href: 'https://elibrary.ru/author_profile.asp?authorid=',
      controlName: 'rincId',
      hint: 'пример: 610888'
    },
    {
      name: ' GoogleScholarID',
      href: 'https://scholar.google.com/citations?user=',
      controlName: 'googleScholarId',
      hint: 'пример: uUK5JkUAAAAJ'
    },
    {
      name: ' researchgate.net',
      href: 'https://www.researchgate.net/profile/',
      controlName: 'researchgateId',
      hint: 'пример: Vadim_Skeeba'
    },
    {
      name: ' mendeley.com',
      href: 'https://www.mendeley.com/profiles/',
      controlName: 'mendeleyId',
      hint: 'пример: vadim-skeeba'
    },
    {name: ' Loop', href: 'https://loop.frontiersin.org/people/', controlName: 'loopId', hint: 'пример: 634569'},
  ]

  orcId = new FormControl('')
  publonId = new FormControl('')
  researcherId = new FormControl('')
  scopusId = new FormControl('')
  rincId = new FormControl('')
  googleScholarId = new FormControl('')
  researchgateId = new FormControl('')
  mendeleyId = new FormControl('')
  loopId = new FormControl('')
  authorIds = new FormGroup({
    orcId: this.orcId,
    publonId: this.publonId,
    researcherId: this.researcherId,
    scopusId: this.scopusId,
    rincId: this.rincId,
    googleScholarId: this.googleScholarId,
    researchgateId: this.researchgateId,
    mendeleyId: this.mendeleyId,
    loopId: this.loopId,
  });
  showError = false;
  errMsg = '';
  showLoadingSpinner = false;
  onlyForShow = false;

  constructor(private locale: LocaleService,
              private signService: SignInService,
              private router: Router) {
    this.props = locale.props;
    this.onlyForShow = this.signService.token !== '';
  }

  ngOnInit(): void {
  }

  saveClick() {
    if (!this.loginForm.valid || !this.passportForm.valid || !this.passportForm1.valid || !this.phones.valid) {
      this.errMsg = 'Формы должны быть заполнены правильно!'
      this.showError = true
      return
    }
    const user: any = {}
    for (const key in this.loginForm.value) {
      user[key] = this.loginForm.value[key]
    }
    user.passports = [this.passportForm.value, this.passportForm1.value]
    user.authorIds = []
    for (const key in this.authorIds.value) {
      if (this.authorIds.value[key]) {
        user.authorIds.push({idname: key, id: this.authorIds.value[key]})
      }
    }

    user.telephons = []
    for (const key in this.phones.value) {
      if (this.phones.value[key])
        user.telephons.push({type: key, number: this.phones.value[key]})
    }
    if (user.password !== user.password1) {
      this.errMsg = 'Паролы не совпадают!'
      this.showError = true
      return
    }

    if (user.telephons.length === 0) {
      this.errMsg = 'Хотя бы один номер телефон должен быть!'
      this.showError = true
      return
    }
    this.signService.register(user).subscribe((res) => {
      if (res instanceof HttpErrorResponse) {
        this.showError = true;
        this.errMsg = res.error.message
        return;
      }
      if (!res.error) {
        this.router.navigate(['sign-in']).catch((errr) => {
          console.log(errr);
          throw errr;
        });
      } else {
        console.log(res.error);
      }
    }, (err) => {
      this.errMsg = err.message;
      this.showError = true;
      this.showLoadingSpinner = false;
      throw err;
    });
  }

  onErrOK() {
    this.showError = false;
    this.errMsg = '';
  }
}
