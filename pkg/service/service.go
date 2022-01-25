package service

import "github.com/Sinojon205/maqola/pkg/repository"

type Authorization interface {
}
type Service struct {
	Authorization
}

func NewService(repos *repository.Repository) *Service {
	return &Service{}
}
