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

RowComponent = ({ index, style, data, by }) => {
  if (tt.get('byDefault') === 'byDefault') {
    return <div style={{ backgroundColor: data[by][index].backgroundColor, color: 'white', ...style }}>
      编号：{index + 1} 书名：{data[by][index].name}
    </div>
  }

  if (tt.get('byDate')) {
    if (_.isString(data[by][index])) {
      return <div style={{ ...style }}>
        <h3>{data[by][index]}</h3>
      </div>
    } else {
      return <div style={{ backgroundColor: data[by][index].backgroundColor, color: 'white', ...style }}>
        编号：{index + 1} 书名：{data[by][index].name}
      </div>
    }
  }
}

ListComponent = ({ data, by }) => {
  console.log('rerun')
  return <div>
    <NavComponent />
    <List
      width={680}
      height={300}
      rowCount={data[by].length}
      rowHeight={50}
      rowRenderer={({ index, style }) => <RowComponent key={index} index={index} style={style} data={data} by={by} />}
    />
  </div>
}
