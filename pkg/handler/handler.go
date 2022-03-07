package handler

import (
	"github.com/Sinojon205/maqola/pkg/service"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"net/http"
)

type Handler struct {
	services *service.Service
}

func NewHandler(services *service.Service) *Handler {
	return &Handler{
		services: services,
	}
}

func (h *Handler) InitRoutes() *gin.Engine {
	router := gin.New()
	auth := router.Group("/auth")
	{
		auth.POST("/sign-up", h.signUp)
		auth.POST("/sign-in", h.signIn)
	}
	api := router.Group("/api", h.userIdentity)
	{
		articles := api.Group("/articles")
		{
			articles.POST("/", h.createArticle)
			articles.GET("/", h.getAllArticles)
			articles.GET("/:id", h.getArticleById)
			articles.PUT("/:id", h.updateArticle)
			articles.DELETE("/:id", h.deleteArticle)
		}
	}
	staticFilesGrp := router.Group("/files")
	{
		staticFilesGrp.StaticFS("", http.Dir("../files"))
	}
	router.Use(static.Serve("/", static.LocalFile("./ui", false)))
	return router
}
