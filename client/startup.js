Meteor.startup(function() {
  const Test = Container(SubsTracker)(ListComponent)
  render(<Test />, $('#app')[0])
})
