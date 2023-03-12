package repository

import (
	"errors"
	"github.com/Sinojon205/maqola"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type UserRepository struct {
	collection *mongo.Collection
}

func (r UserRepository) CreateUser(user maqola.User) (string, error) {
	var u maqola.User
	filter := bson.M{"userName": bson.M{"$eq": user.UserName}}
	err := r.collection.FindOne(getContext(), filter).Decode(&u)
	if err == nil {
		return "", errors.New("The userName already exists!")
	}
	result, err := r.collection.InsertOne(getContext(), user)
	if err != nil {
		return "", err
	}
	return result.InsertedID.(primitive.ObjectID).Hex(), nil
}
func (r UserRepository) UpdateUser(user maqola.User) (int64, error) {
	filter := bson.M{"_id": bson.M{"$eq": user.Id}}
	result, err := r.collection.UpdateOne(getContext(), filter, user)
	if err != nil {
		return 0, err
	}
	return result.ModifiedCount, nil
}

func (r UserRepository) GetUser(userName, password string) (maqola.User, error) {
	var user maqola.User
	filter := bson.M{"userName": bson.M{"$eq": userName}, "password": bson.M{"$eq": password}}
	err := r.collection.FindOne(getContext(), filter).Decode(&user)
	return user, err
}

func (r UserRepository) GetAllUsers() ([]maqola.User, error) {
	filter := bson.M{}
	cursor, err := r.collection.Find(getContext(), filter)
	users := make([]maqola.User, 0)
	defer cursor.Close(getContext())
	for cursor.Next(getContext()) {
		var user maqola.User
		cursor.Decode(&user)
		users = append(users, user)
	}
	err = cursor.Err()
	return users, err
}
