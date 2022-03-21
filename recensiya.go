package maqola

import "go.mongodb.org/mongo-driver/bson/primitive"

type Recensiya struct {
	Id         primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	MaqolaId   string             `json:"maqolaid" bson:"maqolaid"`
	AddingDate int64              `json:"addingdate" bson:"addingdate"`
}
