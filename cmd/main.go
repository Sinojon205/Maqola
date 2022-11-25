package main

import (
	"github.com/Sinojon205/maqola"
	"github.com/Sinojon205/maqola/pkg/handler"
	"github.com/Sinojon205/maqola/pkg/repository"
	"github.com/Sinojon205/maqola/pkg/service"
	"github.com/sirupsen/logrus"
	"gopkg.in/yaml.v2"
	"io/ioutil"
)

type Config struct {
	Port        string `yaml:"port"`
	LlogLevel   string `yaml:"logLevel"`
	DatabaseUrl string `yaml:"databaseUrl"`
}

func main() {
	config := initConfig()
	println(config.DatabaseUrl)
	store, err := repository.New(config.DatabaseUrl)
	if err != nil {
		logrus.Fatalf("error  connecting to database: %s", err.Error())
	}
	store.Open()
	repos := repository.NewRepository(store)
	services := service.NewService(repos)
	handlers := handler.NewHandler(services)
	srv := new(maqola.Server)

	if err := srv.Run(config.Port, handlers.InitRoutes()); err != nil {
		logrus.Fatalf("error occured while running http server: %s", err.Error())
	}

}

func initConfig() *Config {
	yamlFile, err := ioutil.ReadFile("configs/config.yml")
	c := &Config{}
	if err != nil {
		logrus.Printf("yamlFile.Get err   #%v ", err)
	}
	err = yaml.Unmarshal(yamlFile, &c)
	if err != nil {
		logrus.Printf("yamlFile.Get err   #%v ", err)
	}
	return c
}
