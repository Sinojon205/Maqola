class BaseArticleData {
  title: string = ''
  authorsid: string = ''
  annotation: string = ''
  keywords: string = ''
  literature: string = ''
}

export class Article {
  numb: number = 0
  _id: string = ''
  basedata: BaseArticleData[] = [new BaseArticleData(), new BaseArticleData()]
  udk: string = ''
  finansing: string = ''
  expertskanid: string = ''
  licenseskanid: string = ''
  articlfileid: string = ''
  licensetextfileid: string = ''
  imagesid: string = ''
  tablefilesid: string = ''
  status: string = ''
  addingdate: number = 0
}
