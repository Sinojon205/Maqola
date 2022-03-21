package repository

import (
	"github.com/Sinojon205/maqola"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type RecensiyaRepository struct {
	collection *mongo.Collection
}

func (r *RecensiyaRepository) CreateRecensiya(recensiya maqola.Recensiya) (string, error) {
	result, err := r.collection.InsertOne(getContext(), recensiya)
	if err != nil {
		return "", err
	}
	return result.InsertedID.(primitive.ObjectID).Hex(), nil
}

func (r *RecensiyaRepository) UpdateRecensiya(recensiya maqola.Recensiya) (string, error) {
	_, err := r.collection.UpdateOne(getContext(), bson.M{"maqolaid": bson.M{"$eq": recensiya.Id.Hex()}}, recensiya)
	if err != nil {
		return "", err
	}
	return recensiya.Id.Hex(), nil
}

func (r *RecensiyaRepository) GetAllRecensiya(ids []string) ([]maqola.Recensiya, error) {
	cursor, err := r.collection.Find(getContext(), bson.M{"maqolaid": bson.M{"$in": ids}})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(getContext())
	recenses := make([]maqola.Recensiya, 0)
	for cursor.Next(getContext()) {
		var rec maqola.Recensiya
		cursor.Decode(&rec)
		recenses = append(recenses, rec)
	}
	err = cursor.Err()
	if err != nil {
		return nil, err
	}
	return recenses, nil
}
