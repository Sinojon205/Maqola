package repository

import (
	"github.com/Sinojon205/maqola"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type ArticleRepository struct {
	collection     *mongo.Collection
	fileCollection *mongo.Collection
}

func (r *ArticleRepository) CreateArticle(a maqola.Article) (string, error) {
	result, err := r.collection.InsertOne(getContext(), a)
	if err != nil {
		return "", err
	}
	return result.InsertedID.(primitive.ObjectID).Hex(), nil
}

func (r *ArticleRepository) GetAllArticles(userId string) ([]maqola.Article, error) {
	cursor, err := r.collection.Find(getContext(), bson.M{"userid": bson.M{"$eq": userId}})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(getContext())
	articles := make([]maqola.Article, 0)
	for cursor.Next(getContext()) {
		var art maqola.Article
		cursor.Decode(&art)
		articles = append(articles, art)
	}
	err = cursor.Err()
	if err != nil {
		return nil, err
	}
	return articles, nil
}

func (r *ArticleRepository) GetArticlesAmount() (int, error) {
	var article maqola.Article
	err := r.collection.FindOne(getContext(), bson.M{"numb": bson.M{"$max": "$numb"}}).Decode(&article)
	if err != nil {
		return 0, nil
	}
	return article.Numb, nil
}

func (r *ArticleRepository) GetAllFiles(files [][32]byte) ([]maqola.ArticleFile, error) {
	cursor, err := r.fileCollection.Find(getContext(), bson.M{"filehash": bson.M{"$in": files}})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(getContext())
	result := make([]maqola.ArticleFile, 0)
	for cursor.Next(getContext()) {
		var art maqola.ArticleFile
		cursor.Decode(&art)
		result = append(result, art)
	}
	err = cursor.Err()
	if err != nil {
		return nil, err
	}
	return result, nil
}

func (r *ArticleRepository) AddAllFiles(files []interface{}) error {
	_, err := r.fileCollection.InsertMany(getContext(), files)
	return err
}
