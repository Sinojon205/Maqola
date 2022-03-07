package handler

import (
	"github.com/Sinojon205/maqola"
	"github.com/gin-gonic/gin"
	"net/http"
)

func (h *Handler) createArticle(c *gin.Context) {
	id, ok := c.Get(userCtx)
	if !ok {
		newErrorResponse(c, http.StatusInternalServerError, "user id not found")
		return
	}
	var input maqola.ArticleInput
	if err := c.ShouldBind(&input); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}
	id, err := h.services.Article.CreateArticle(input)
	if err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}
	c.JSON(http.StatusOK, map[string]interface{}{"id": id})
}

func (h *Handler) getAllArticles(c *gin.Context) {
	id, ok := c.Get(userCtx)
	if !ok {
		newErrorResponse(c, http.StatusInternalServerError, "user id not found")
		return
	}
	articles, err := h.services.GetAllArticles(id.(string))
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}
	c.JSON(http.StatusOK, map[string]interface{}{"articles": articles})
}
func (h *Handler) getArticleById(c *gin.Context) {
	c.JSON(http.StatusOK, map[string]interface{}{"id": 0})
}
func (h *Handler) updateArticle(c *gin.Context) {
	c.JSON(http.StatusOK, map[string]interface{}{"id": 0})
}
func (h *Handler) deleteArticle(c *gin.Context) {
	c.JSON(http.StatusOK, map[string]interface{}{"id": 0})
}
