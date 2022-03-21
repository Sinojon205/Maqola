package service

import (
	"github.com/Sinojon205/maqola"
	"github.com/Sinojon205/maqola/pkg/repository"
	"time"
)

type RecensiyaService struct {
	repo repository.Recensiya
}

func NewRecensiyaService(repo repository.Recensiya) *RecensiyaService {
	return &RecensiyaService{repo: repo}
}

func (r *RecensiyaService) CreateRecensiya(recensiya maqola.Recensiya) (string, error) {
	recensiya.AddingDate = time.Now().Unix()
	return r.repo.CreateRecensiya(recensiya)
}

func (r *RecensiyaService) UpdateRecensiya(recensiya maqola.Recensiya) (string, error) {
	return r.repo.UpdateRecensiya(recensiya)
}

func (r *RecensiyaService) GetAllRecensiya(ids []string) ([]maqola.Recensiya, error) {
	return r.repo.GetAllRecensiya(ids)
}
