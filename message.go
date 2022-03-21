package maqola

import "go.mongodb.org/mongo-driver/bson/primitive"

type Message struct {
	Id         primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	MaqolaId   string             `json:"maqolaid" bson:"maqolaid"`
	Message    string             `json:"message" bson:"message"`
	AddingDate int64              `json:"addingdate" bson:"addingdate"`
}
