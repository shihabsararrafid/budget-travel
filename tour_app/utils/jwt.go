package utils

import (
	"time"
	"tour-guide-app/config"

	"github.com/golang-jwt/jwt/v4"
)

func GenerateToken(userID int) (string, error) {
	secret := config.AppConfig.JWTSecret
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": userID,
		"exp":     time.Now().Add(72 * time.Hour).Unix(),
	})
	return token.SignedString([]byte(secret))
}

func ParseToken(tokenStr string) (int, error) {
	secret := config.AppConfig.JWTSecret
	t, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		return []byte(secret), nil
	})
	if err != nil || !t.Valid {
		return 0, err
	}
	claims := t.Claims.(jwt.MapClaims)
	return int(claims["user_id"].(float64)), nil
}
