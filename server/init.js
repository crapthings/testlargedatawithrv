console.time('生成分类')
const __categories = _.times(10, n => ({
  _id: Random.id(),
  name: faker.lorem.word(),
  backgroundColor: randomColor({ luminosity: 'dark' }),
}))
console.timeEnd('生成分类')

console.time('生成作者')
const __authors = _.times(5000, n => ({
  _id: Random.id(),
  name: faker.name.findName(),
  backgroundColor: randomColor({ luminosity: 'dark' }),
}))
console.timeEnd('生成作者')

console.time('生成书籍')
const __books = _.chain(__categories).map(c => {
  return _.times(1000, b => ({
    _id: Random.id(),
    name: faker.lorem.sentence(),
    desc: faker.lorem.paragraphs(),
    categoryId: c._id,
    authorIds: _.chain(__authors).sampleSize(_.random(2, 5)).map('_id').value(),
    publishedAt: faker.date.past(),
    backgroundColor: randomColor({ luminosity: 'dark' }),
  }))
}).flatten().value()
console.timeEnd('生成书籍')

console.time('清空三个collection')
_.each([Categories, Books, Authors], c => {
  if (Meteor.isServer) {
    !c.findOne() && c.remove({})
  }
})
console.timeEnd('清空三个collection')

console.time('插入数据到数据库')
!Categories.findOne() && Categories.batchInsert(__categories)
!Books.findOne() && Books.batchInsert(__books)
!Authors.findOne() && Authors.batchInsert(__authors)
console.timeEnd('插入数据到数据库')
