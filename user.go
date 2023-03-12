package maqola

import "go.mongodb.org/mongo-driver/bson/primitive"

type SAddres struct {
	Country   string `json:"country" bson:"country"`
	City      string `json:"city" bson:"city"`
	Street    string `json:"street" bson:"street"`
	House     string `json:"house" bson:"house"`
	MailIndex string `json:"mailIndex" bson:"mailIndex"`
}

type Passport struct {
	Name                    string  `json:"name" bson:"name"`
	Familia                 string  `json:"familia" bson:"familia"`
	Nasab                   string  `json:"nasab" bson:"nasab"`
	AppealForm              int     `json:"appealForm" bson:"appealForm"`
	AcademicDegree          int     `json:"academicDegree" bson:"academicDegree"`
	AcademicTitle           int     `json:"academicTitle" bson:"academicTitle"`
	Position                string  `json:"position" bson:"position"`
	Organisation            string  `json:"organisation" bson:"organisation"`
	Department              string  `json:"department" bson:"department"`
	OrganisationAddress     SAddres `json:"organisationAddress" bson:"organisationAddress"`
	ScientificInterestsArea string  `json:"scientificInterestsArea" bson:"scientificInterestsArea"`
	Language                string  `json:"language" bson:"language"`
}

type AuthorIds struct {
	orcId           string `json:"orcId" bson:"orcId"`
	publonId        string `json:"publonId" bson:"publonId"`
	researcherId    string `json:"researcherId" bson:"researcherId"`
	scopusId        string `json:"scopusId" bson:"scopusId"`
	rincId          string `json:"rincId" bson:"rincId"`
	googleScholarId string `json:"googleScholarId" bson:"googleScholarId"`
	researchgateId  string `json:"researchgateId" bson:"researchgateId"`
	mendeleyId      string `json:"mendeleyId" bson:"mendeleyId"`
	loopId          string `json:"loopId" bson:"loopId"`
}

type Telephons struct {
	mobTel  string `json:"mobTel" bson:"mobTel"`
	homeTel string ` json:"homeTel" bson:"homeTel"`
	workTel string ` json:"workTel" bson:"workTel"`
}

type User struct {
	Id         primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	UserName   string             `json:"userName" bson:"userName"`
	Password   string             `json:"password" bson:"password"`
	Passports  []Passport         `json:"passports" bson:"passports"`
	AuthorIds  AuthorIds          `json:"authorIds" bson:"authorIds"`
	MainEmail  string             `json:"mainEmail" bson:"mainEmail"`
	AlterEmail string             `json:"alterEmail" bson:"alterEmail"`
	Telephons  Telephons          `json:"telephons" bson:"telephons"`
	Fax        string             `json:"fax" bson:"fax"`
}
