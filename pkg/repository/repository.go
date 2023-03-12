package repository

import (
	"github.com/Sinojon205/maqola"
)

type Authorization interface {
	CreateUser(user maqola.User) (string, error)
	GetUser(userName, password string) (maqola.User, error)
	GetAllUsers() ([]maqola.User, error)
	UpdateUser(user maqola.User) (int64, error)
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
	CreateArticle(a maqola.Article) (string, error)
	GetAllArticles(userId string, count, page int) ([]maqola.Article, int64, error)
	GetArticlesAmount() (int, error)
	GetAllFiles(files [][32]byte) ([]maqola.ArticleFile, error)
	AddAllFiles(files []interface{}) error
}
type Repository struct {
	Authorization
	Article
	Recensiya
	Message
}

func NewRepository(s *Store) *Repository {
	return &Repository{
		Authorization: s.User(),
		Article:       s.Article(),
		Recensiya:     s.Recensiya(),
		Message:       s.Message(),
	}
}
