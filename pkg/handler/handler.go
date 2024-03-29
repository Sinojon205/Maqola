package handler

import (
	"github.com/Sinojon205/maqola/pkg/service"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
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
	router.Use(CORSMiddleware())

	auth := router.Group("/auth")
	{
		auth.POST("/sign-up", h.signUp)
		auth.POST("/sign-in", h.signIn)
	}
	api := router.Group("/api", h.userIdentity)
	{
		api.POST("/refresh-token", h.refreshToken)
		articles := api.Group("/articles")
		{
			articles.POST("/", h.createArticle)
			articles.GET("/users", h.getUserArticles)
			articles.GET("/", h.getAllArticles)
			articles.GET("/:id", h.getArticleById)
			articles.PUT("/:id", h.updateArticle)
			articles.DELETE("/:id", h.deleteArticle)
		}
		users := api.Group("/users")
		{
			users.GET("/", h.getAllUsers)
			users.POST("/update-user/:id", h.updateUser)
		}
		recens := api.Group("/recens")
		{
			recens.POST("/", h.createRecensiya)
			recens.PUT("/", h.updateRecensiya)
		}
		messages := api.Group("/messages")
		{
			messages.POST("/", h.createMessage)
		}
	}
	staticFilesGrp := router.Group("/files")
	{
		staticFilesGrp.StaticFS("", http.Dir("../maqola-files"))
	}
	router.Use(static.Serve("/", static.LocalFile("./ui", false)))
	return router
}

func (h *Handler) getArticles(id string, c *gin.Context) {
	params := c.Request.URL.Query()
	pI, err := strconv.Atoi(params.Get("page"))
	cI, err := strconv.Atoi(params.Get("count"))
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, "user id not found")
		return
	}
	articles, total, err := h.services.GetAllArticles(id, cI, pI)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}
	articleIds := make([]string, len(articles))

	for i, art := range articles {
		articleIds[i] = art.Id.Hex()
	}

	recens, err := h.services.GetAllRecensiya(articleIds)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	msgs, err := h.services.GetAllMessages(articleIds)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{"articles": articles, "recens": recens, "messages": msgs, "total": total})
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
