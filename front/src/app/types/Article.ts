class BaseArticleDate {
  title: string = ''
  authorsid: string = ''
  annotation: string = ''
  keywords: string = ''
  literature: string = ''
}

export class Article {
  _id: string = ''
  basedata: BaseArticleDate = new BaseArticleDate()
  udk: string = ''
  finansing: string = ''
  expertskanid: string = ''
  licenseskanid: string = ''
  articlfileid: string = ''
  licensetextfileid: string = ''
  imagesid: string = ''
  tablefilesid: string = ''
}
