package service

import (
	"github.com/Sinojon205/maqola"
	"github.com/Sinojon205/maqola/pkg/repository"
)

type Authorization interface {
	CreateUser(user maqola.User) (string, error)
	GenerateToken(userName string, password string) (string, maqola.User, error)
	ParseToken(token string) (string, error)
}

type Article interface {
	CreateArticle(user maqola.ArticleInput) (string, error)
	GetAllArticles(userId string) ([]maqola.Article, error)
}

type Service struct {
	Authorization
	Article
}

func NewService(repos *repository.Repository) *Service {
	return &Service{
		Authorization: NewAuthService(repos.Authorization),
		Article:       NewArticleService(repos.Article),
	}
}
