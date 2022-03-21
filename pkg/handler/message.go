package handler

import (
	"github.com/Sinojon205/maqola"
	"github.com/gin-gonic/gin"
	"net/http"
)

func (h *Handler) createMessage(c *gin.Context) {
	id, ok := c.Get(userCtx)
	if !ok {
		newErrorResponse(c, http.StatusInternalServerError, "user id not found")
		return
	}
	var input maqola.Message
	if err := c.ShouldBind(&input); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}
	id, err := h.services.Message.CreateMessage(input)
	if err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}
	c.JSON(http.StatusOK, map[string]interface{}{"id": id})
}
