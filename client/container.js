tt = new ReactiveVar('byDefault')

wow = true

SubsTracker = (props, onData) => {

  console.time('订阅数据完成')
  console.profile('订阅数据完成')
  if (Meteor.subscribe('test1').ready() && wow) {
    wow = false
    console.log('Categories', Categories.find().count(), 'Books', Books.find().count(), 'Authors', Authors.find().count())
    console.timeEnd('订阅数据完成')
    console.profileEnd('订阅数据完成')
    console.time('fetch books')
    const byDefault = Books.find().fetch()
    console.timeEnd('fetch books')

    const byDate = _.chain(Books.find().fetch())
      // .orderBy('publishedAt', ['desc'])
      .groupBy(d => {
        // console.log(1)
        return moment(d.publishedAt).format('YYYY-MM')
      })
      .toPairs()
      .flattenDeep()
      .value()

    const data = {
      byDefault,
      byDate,
    }

    onData(null, { data })
  }

}

NavTracker = (props, onData) => {
  const by = tt.get()
  onData(null, { by })
}
