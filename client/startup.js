tt = new ReactiveVar('byDefault')
Meteor.startup(function() {
  Tracker.autorun(function() {
    console.time('订阅数据完成')
    if (Meteor.subscribe('test1').ready()) {

      const data = {
        byDefault: Books.find().fetch(),
        byDate: _.chain(Books.find().fetch())
          .orderBy('publishedAt', ['desc'])
          .groupBy(d => {
            return moment(d.publishedAt).format('YYYY-MM')
          })
          .toPairs()
          .flattenDeep()
          .value()
      }

      render(<div>
        <nav>
          <span style={{ cursor: 'pointer' }} onClick={() => tt.set('byDefault')}>默认</span>
          <span> | </span>
          <span style={{ cursor: 'pointer' }} onClick={() => tt.set('byDate')}>日期</span>
          <span> | </span>
          <span style={{ cursor: 'pointer' }} onClick={() => tt.set('byCategories')}>分类</span>
          <span> | </span>
          <span style={{ cursor: 'pointer' }} onClick={() => tt.set('byAuthors')}>作者</span>
        </nav>
        <List
        width={680}
        height={300}
        rowCount={data[tt.get()].length}
        rowHeight={50}
        useDynamicRowHeight={true}
        rowRenderer={({ key, index, style }) => {
          if (tt.get('byDefault') === 'byDefault') {
            return <div key={key} style={{ backgroundColor: data[tt.get()][index].backgroundColor, color: 'white', ...style }}>
              编号：{index + 1} 书名：{data[tt.get()][index].name}
            </div>
          }

          if (tt.get('byDate')) {
            if (_.isString(data[tt.get()][index])) {
              return <div key={key} style={{ ...style }}>
                <h3>{data[tt.get()][index]}</h3>
              </div>
            } else {
              return <div key={key} style={{ backgroundColor: data[tt.get()][index].backgroundColor, color: 'white', ...style }}>
                编号：{index + 1} 书名：{data[tt.get()][index].name}
              </div>
            }
          }
        }}
        />
      </div>, $('#app')[0])
      console.log('Categories', Categories.find().count(), 'Books', Books.find().count(), 'Authors', Authors.find().count())
      console.timeEnd('订阅数据完成')
    } else {
      render(<h1>loading</h1>, $('#app')[0])
    }
  })
  // render(<h1>hello kitty</h1>, $('#app')[0])
})
