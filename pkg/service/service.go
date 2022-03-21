package service

import (
	"github.com/Sinojon205/maqola"
	"github.com/Sinojon205/maqola/pkg/repository"
)

type Authorization interface {
	CreateUser(user maqola.User) (string, error)
	GenerateToken(userName string, password string) (string, maqola.User, error)
	ParseToken(token string) (string, error)
	GetAllUsers() ([]maqola.User, error)
}

type Message interface {
	CreateMessage(msg maqola.Message) (string, error)
	GetAllMessages(idMaqola []string) ([]maqola.Message, error)
}

type Recensiya interface {
	CreateRecensiya(recensiya maqola.Recensiya) (string, error)
	UpdateRecensiya(recensiya maqola.Recensiya) (string, error)
	GetAllRecensiya(idMaqola []string) ([]maqola.Recensiya, error)
}

type Article interface {
	CreateArticle(user maqola.ArticleInput, userId string) (string, error)
	GetAllArticles(userId string) ([]maqola.Article, error)
}

type Service struct {
	Authorization
	Article
	Recensiya
	Message
}

func NewService(repos *repository.Repository) *Service {
	return &Service{
		Authorization: NewAuthService(repos.Authorization),
		Article:       NewArticleService(repos.Article),
		Recensiya:     NewRecensiyaService(repos.Recensiya),
		Message:       NewMessageService(repos.Message),
	}
}
