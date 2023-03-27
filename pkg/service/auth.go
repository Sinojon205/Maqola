package service

import (
	"crypto/sha1"
	"errors"
	"fmt"
	"github.com/Sinojon205/maqola"
	"github.com/Sinojon205/maqola/pkg/repository"
	"github.com/dgrijalva/jwt-go"
	"github.com/sirupsen/logrus"
	"time"
)

const (
	salt            = "dfkdsjfklsdfj_sldkoi3242343242"
	signingKey      = "sdaskjdhkjahriw3or3asdsadad"
	tokenTTL        = 6 * time.Minute
	refreshTokenTTL = 24 * time.Hour * 30
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
	user.Password = generatePasswordHash(user.Password)
	return auth.repo.CreateUser(user)
}

func (auth *AuthService) UpdateUser(user maqola.User) (int64, error) {
	user.Password = generatePasswordHash(user.Password)
	return auth.repo.UpdateUser(user)
}

func (auth *AuthService) GenerateToken(userName, password string) (string, string, maqola.User, error) {
	user, err := auth.repo.GetUser(userName, generatePasswordHash(password))
	if err != nil {
		return "", "", user, nil
	}
	t, e := auth.generateToken(user.Id.Hex(), tokenTTL)
	logrus.Print(t, e)
	fmt.Print(t)
	at, e := auth.generateToken(user.Id.Hex(), refreshTokenTTL)
	logrus.Print(at, e)
	fmt.Print(at)
	return t, at, user, e
}

func (auth *AuthService) generateToken(hex string, ttl time.Duration) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, &tokenClaims{
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(ttl).Unix(),
			IssuedAt:  time.Now().Unix()},
		hex,
	})
	return token.SignedString([]byte(signingKey))
}

func (auth *AuthService) GetAllUsers() ([]maqola.User, error) {
	return auth.repo.GetAllUsers()
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
func (auth *AuthService) RefreshToken(userId string) (string, error) {

	return auth.generateToken(userId, tokenTTL)
}

func generatePasswordHash(password string) string {
	hash := sha1.New()
	hash.Write([]byte(password))
	return fmt.Sprintf("%x", hash.Sum([]byte(salt)))
}
