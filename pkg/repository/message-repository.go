package repository

import (
	"github.com/Sinojon205/maqola"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type MessageRepository struct {
	collection *mongo.Collection
}

func (r *MessageRepository) CreateMessage(msg maqola.Message) (string, error) {
	result, err := r.collection.InsertOne(getContext(), msg)
	if err != nil {
		return "", err
	}
	return result.InsertedID.(primitive.ObjectID).Hex(), nil
}

func (r *MessageRepository) GetAllMessages(ids []string) ([]maqola.Message, error) {
	cursor, err := r.collection.Find(getContext(), bson.M{"maqolaid": bson.M{"$in": ids}})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(getContext())
	msgs := make([]maqola.Message, 0)
	for cursor.Next(getContext()) {
		var msg maqola.Message
		cursor.Decode(&msg)
		msgs = append(msgs, msg)
	}
	err = cursor.Err()
	if err != nil {
		return nil, err
	}
	return msgs, nil
}
