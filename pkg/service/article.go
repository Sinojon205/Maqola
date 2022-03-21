package service

import (
	"archive/zip"
	"bytes"
	"errors"
	"github.com/Sinojon205/maqola"
	"github.com/Sinojon205/maqola/pkg/repository"
	uuid "github.com/satori/go.uuid"
	"io/ioutil"
	"lukechampine.com/blake3"
	"os"
	"strings"
	"time"
)

var FOLDERS = []string{"skan/", "skanLic/", "text/", "licText/", "table/", "pic/"}

const filePath = "../files/"

type ArticleService struct {
	repo repository.Article
}

func NewArticleService(repo repository.Article) *ArticleService {
	return &ArticleService{repo: repo}
}

func (article *ArticleService) CreateArticle(input maqola.ArticleInput, userId string) (string, error) {
	var output maqola.Article
	zipFile, err := zip.NewReader(bytes.NewReader(input.Files), int64(len(input.Files)))
	if err != nil {
		return "", err
	}
	folder := ""
	fileLength := len(zipFile.File)
	files := make([][]byte, fileLength)
	hashes := make([][32]byte, fileLength)
	fns := make([]string, fileLength)
	for i, f := range zipFile.File {
		if includesInArray(FOLDERS, f.Name) {
			folder = f.Name
			continue
		}
		rc, err := f.Open()
		if err != nil {
			return "", err
		}
		bytes, err := ioutil.ReadAll(rc)
		if err != nil {
			return "", err
		}
		h := blake3.Sum256(bytes)
		hashes[i] = h
		files[i] = bytes
		fns[i] = filePath + createFileName(h, f.Name)
	}
	output.BaseData = input.BaseData
	output.Finansing = input.Finansing
	output.UDK = input.UDK
	output.UserId = userId
	existedFiles, err := article.repo.GetAllFiles(hashes)
	if err != nil {
		return "", err
	}
	filesData := make([]interface{}, 0)
	for i, fn := range fns {
		if fn == "" {
			folder = zipFile.File[i].Name
			continue
		}
		f := findInFiles(existedFiles, hashes[i])
		if f.FileName != "" {
			fn = f.FileName
		} else {
			if _, err := os.Stat(fn); errors.Is(err, os.ErrNotExist) {
				err = os.WriteFile(fn, files[i], 644)
				if err != nil {
					return "", err
				}
			}
			filesData = append(filesData, maqola.ArticleFile{FileName: fn, FileHash: hashes[i]})
		}
		switch folder {
		case FOLDERS[0]:
			output.ExpertSkanId = fn
			break
		case FOLDERS[1]:
			output.LicenseSkanId = fn
			break
		case FOLDERS[2]:
			output.ArticlFileId = fn
			break
		case FOLDERS[3]:
			output.LicenseTextFileId = fn
			break
		case FOLDERS[4]:
			output.TableFilesId = append(output.TableFilesId, fn)
			break
		case FOLDERS[5]:
			output.ImagesId = append(output.ImagesId, fn)
			break
		}
	}
	err = article.repo.AddAllFiles(filesData)
	if err != nil {
		return "", err
	}
	numb, err := article.repo.GetArticlesAmount()
	if err != nil {
		return "", err
	}
	output.Numb = numb + 1
	output.Addingdate = time.Now().Unix()
	return article.repo.CreateArticle(output)
}

func (article *ArticleService) GetAllArticles(userId string) ([]maqola.Article, error) {
	return article.repo.GetAllArticles(userId)
}
func createFileName(h [32]byte, name string) string {
	uuid, err := uuid.FromBytes(h[:16])
	if err != nil {
		return name
	}
	fileType := name[strings.LastIndex(name, "."):]
	return uuid.String() + fileType
}

func includesInArray(arr []string, item string) bool {
	i := 0
	l := len(arr)
	for i < l && arr[i] != item {
		i++
	}
	return i < l
}
func findInFiles(arr []maqola.ArticleFile, item [32]byte) maqola.ArticleFile {
	i := 0
	l := len(arr)
	for i < l && string(arr[i].FileHash[:]) != string(item[:]) {
		i++
	}
	if i < l {
		return arr[i]
	}
	return maqola.ArticleFile{}
}
