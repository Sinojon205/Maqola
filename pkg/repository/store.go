package repository

import (
	"context"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"time"
)

type Store struct {
	Client              *mongo.Client
	DB                  *mongo.Database
	userRepository      *UserRepository
	articleRepository   *ArticleRepository
	recensiyaRepository *RecensiyaRepository
	messageRepository   *MessageRepository
}

func New(dbUrl string) (*Store, error) {
	opts := options.Client().ApplyURI(dbUrl)
	client, err := mongo.Connect(getContext(), opts)
	if err == nil {
		return &Store{
			Client: client,
		}, nil
	}
	return nil, err
}

func (s *Store) Open() error {
	s.DB = s.Client.Database("ArticleDB")
	return nil
}

func (s *Store) User() *UserRepository {
	if s.userRepository != nil {
		return s.userRepository
	}

	s.userRepository = &UserRepository{
		collection: s.DB.Collection("usersTb"),
	}

	return s.userRepository
}

func (s *Store) Article() *ArticleRepository {
	if s.articleRepository != nil {
		return s.articleRepository
	}

	s.articleRepository = &ArticleRepository{
		collection:     s.DB.Collection("articlesTb"),
		fileCollection: s.DB.Collection("filesTb"),
	}

	return s.articleRepository
}

func (s *Store) Recensiya() *RecensiyaRepository {
	if s.recensiyaRepository != nil {
		return s.recensiyaRepository
	}

	s.recensiyaRepository = &RecensiyaRepository{
		collection: s.DB.Collection("recensiyaTb"),
	}

	return s.recensiyaRepository
}

func (s *Store) Message() *MessageRepository {
	if s.messageRepository != nil {
		return s.messageRepository
	}

	s.messageRepository = &MessageRepository{
		collection: s.DB.Collection("recensiyaTb"),
	}

	return s.messageRepository
}

func getContext() context.Context {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	return ctx
}
