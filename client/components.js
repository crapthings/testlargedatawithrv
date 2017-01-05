NavComponent = () => {
  return <nav>
    <span style={{ cursor: 'pointer' }} onClick={() => tt.set('byDefault')}>默认</span>
    <span> | </span>
    <span style={{ cursor: 'pointer' }} onClick={() => tt.set('byDate')}>日期</span>
    <span> | </span>
    <span style={{ cursor: 'pointer' }} onClick={() => tt.set('byCategories')}>分类</span>
    <span> | </span>
    <span style={{ cursor: 'pointer' }} onClick={() => tt.set('byAuthors')}>作者</span>
  </nav>
}

ListComponent = ({ data }) => {
  console.log('rerun')
  return <div>
    <NavComponent />
    <List width={680} height={300} rowCount={data[tt.get()].length} rowHeight={50} rowRenderer={({ key, index, style }) => {
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
  </div>
}
