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

type AuthorId struct {
	IdName string `json:"idname"`
	Id     string `json:"id"`
}

type Telephon struct {
	TelephonNumber string `json:"number"`
	TelephonType   string ` json:"type"`
}

type User struct {
	Id         primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	UserName   string             `json:"userName" bson:"userName"`
	Password   string             `json:"password" bson:"password"`
	Passports  []Passport         `json:"passports" bson:"passports"`
	AuthorIds  []AuthorId         `json:"authorIds" bson:"authorIds"`
	MainEmail  string             `json:"mainEmail" bson:"mainEmail"`
	AlterEmail string             `json:"alterEmail" bson:"alterEmail"`
	Telephons  []Telephon         `json:"telephons" bson:"telephons"`
	Fax        string             `json:"fax" bson:"fax"`
}
