Meteor.startup(function() {
  const Test = ComposeAll(
    Container(SubsTracker),
    Container(NavTracker),
  )(ListComponent)
  render(<Test />, $('#app')[0])
})
