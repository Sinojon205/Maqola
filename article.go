package maqola

import "go.mongodb.org/mongo-driver/bson/primitive"

type BaseArticleData struct {
	Title      string   `json:"title" bson:"title"`
	AuthorsId  []string `json:"authorsid" bson:"authorsid"`
	Annotation string   `json:"annotation" bson:"annotation"`
	Keywords   string   `json:"keywords" bson:"keywords"`
	Literature string   `json:"literature" bson:"literature"`
}

type Article struct {
	Id                primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	BaseData          []BaseArticleData  `json:"basedata" bson:"basedata"`
	UDK               string             `json:"udk" bson:"udk"`
	Finansing         string             `json:"finansing" bson:"finansing"`
	ExpertSkanId      string             `json:"expertskanid" bson:"expertskanid"`
	LicenseSkanId     string             `json:"licenseskanid" bson:"licenseskanid"`
	ArticlFileId      string             `json:"articlfileid" bson:"articlfileid"`
	LicenseTextFileId string             `json:"licensetextfileid" bson:"licensetextfileid"`
	ImagesId          []string           `json:"imagesid" bson:"imagesid"`
	TableFilesId      []string           `json:"tablefilesid" bson:"tablefilesid"`
	UserId            string             `json:"userid" bson:"userid"`
	Numb              int                `json:"numb" bson:"numb"`
	Addingdate        int64              `json:"addingdate" bson:"addingdate"`
}

type ArticleInput struct {
	Id        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	BaseData  []BaseArticleData  `json:"basedata" bson:"basedata"`
	UDK       string             `json:"udk" bson:"udk"`
	Finansing string             `json:"finansing" bson:"finansing"`
	Files     []uint8            `json:"files" bson:"files"`
}

type ArticleFile struct {
	FileHash [32]byte `json:"filehash" bson:"filehash"`
	FileName string   `json:"filename" bson:"filename"`
}
