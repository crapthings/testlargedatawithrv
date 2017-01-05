Meteor.publish('test1', function() {
  console.time('pub所有数据')
  const datasets = [Categories.find({}), Books.find({}), Authors.find({})]
  const datasetstest = [Categories.find({}).fetch(), Books.find({}, {
    sort: {
      publishedAt: -1,
    }
  }).fetch(), Authors.find({}).fetch()]
  console.timeEnd('pub所有数据')
  return datasets
})
