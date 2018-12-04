var data = [1, 2, 3, 4]

console.log(data)

var dataInDivs = data.map(function(datum) {
  return '<div>' + datum + '</div>'
})

console.log(dataInDivs)