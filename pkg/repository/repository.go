package repository

import (
	"github.com/Sinojon205/maqola"
)

type Authorization interface {
	CreateUser(user maqola.User) (string, error)
	GetUser(userName, password string) (maqola.User, error)
}

type Article interface {
	CreateArticle(a maqola.Article) (string, error)
	GetAllArticles(userId string) ([]maqola.Article, error)
	GetAllFiles(files [][32]byte) ([]maqola.ArticleFile, error)
	AddAllFiles(files []interface{}) error
}
type Repository struct {
	Authorization
	Article
}

func NewRepository(s *Store) *Repository {
	return &Repository{
		Authorization: s.User(),
		Article:       s.Article(),
	}
}
