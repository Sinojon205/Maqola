package maqola

type User struct {
	Id       string `json:"_"`
	Name     string `json:"name"`
	UserName string `json:"username"`
	Password string `json:"password"`
}
