FROM golang:1.18.3
#Copy all files from the directory to container
COPY . /go/src/github.com/Sinojon205/maqola
WORKDIR /go/src/github.com/Sinojon205/maqola

RUN go build -o main ./cmd/main.go
CMD ["./main"]