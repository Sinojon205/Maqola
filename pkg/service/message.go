package service

import (
	"github.com/Sinojon205/maqola"
	"github.com/Sinojon205/maqola/pkg/repository"
	"time"
)

type MessageService struct {
	repo repository.Message
}

func NewMessageService(repo repository.Message) *MessageService {
	return &MessageService{repo: repo}
}

func (r *MessageService) CreateMessage(msg maqola.Message) (string, error) {
	msg.AddingDate = time.Now().Unix()
	return r.repo.CreateMessage(msg)
}

func (r *MessageService) GetAllMessages(ids []string) ([]maqola.Message, error) {
	return r.repo.GetAllMessages(ids)
}
