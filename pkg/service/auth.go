package service

import (
	"crypto/sha1"
	"errors"
	"fmt"
	"github.com/Sinojon205/maqola"
	"github.com/Sinojon205/maqola/pkg/repository"
	"github.com/dgrijalva/jwt-go"
	"time"
)

const (
	salt       = "dfkdsjfklsdfj_sldkoi3242343242"
	signingKey = "sdaskjdhkjahriw3or3asdsadad"
	tokenTTL   = 12 * time.Hour
)

type tokenClaims struct {
	jwt.StandardClaims
	UserId string `json:"userId"`
}

type AuthService struct {
	repo repository.Authorization
}

func NewAuthService(repo repository.Authorization) *AuthService {
	return &AuthService{repo: repo}
}

func (auth *AuthService) CreateUser(user maqola.User) (string, error) {
	user.Password = geneeratePasswordHash(user.Password)
	return auth.repo.CreateUser(user)
}

func (auth *AuthService) GenerateToken(userName, password string) (string, maqola.User, error) {
	user, err := auth.repo.GetUser(userName, geneeratePasswordHash(password))
	if err != nil {
		return "", user, nil
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, &tokenClaims{
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(tokenTTL).Unix(),
			IssuedAt:  time.Now().Unix()},
		user.Id.Hex(),
	})
	t, e := token.SignedString([]byte(signingKey))
	return t, user, e
}

func (auth *AuthService) ParseToken(accessToken string) (string, error) {
	token, err := jwt.ParseWithClaims(accessToken, &tokenClaims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("invalid signing method")
		}
		return []byte(signingKey), nil
	})
	if err != nil {
		return "", err
	}
	claims, ok := token.Claims.(*tokenClaims)
	if !ok {
		return "", errors.New("token claims are not of type *tokenClaims")
	}
	return claims.UserId, nil
}

func geneeratePasswordHash(password string) string {
	hash := sha1.New()
	hash.Write([]byte(password))
	return fmt.Sprintf("%x", hash.Sum([]byte(salt)))
}
