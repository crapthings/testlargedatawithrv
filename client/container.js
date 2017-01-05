tt = new ReactiveVar('byDefault')

SubsTracker = (props, onData) => {

  console.time('订阅数据完成')
  if (Meteor.subscribe('test1').ready()) {
    console.timeEnd('订阅数据完成')
    console.log('Categories', Categories.find().count(), 'Books', Books.find().count(), 'Authors', Authors.find().count())
    const byDate = _.chain(Books.find().fetch())
      .orderBy('publishedAt', ['desc'])
      .groupBy(d => moment(d.publishedAt).format('YYYY-MM'))
      .toPairs()
      .flattenDeep()
      .value()

    const data = {
      byDefault: Books.find().fetch(),
      byDate,
    }

    onData(null, { data })

  }

}
