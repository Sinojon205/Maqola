package repository

import (
	"github.com/Sinojon205/maqola"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type UserRepository struct {
	collection *mongo.Collection
}

func (r UserRepository) CreateUser(user maqola.User) (string, error) {

	result, err := r.collection.InsertOne(getContext(), user)
	if err != nil {
		return "", err
	}
	return result.InsertedID.(primitive.ObjectID).Hex(), nil
}

func (r UserRepository) GetUser(userName, password string) (maqola.User, error) {
	var user maqola.User
	filter := bson.M{"userName": bson.M{"$eq": userName}, "password": bson.M{"$eq": password}}
	err := r.collection.FindOne(getContext(), filter).Decode(&user)
	return user, err
}
