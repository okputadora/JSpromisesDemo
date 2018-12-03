var users = {
  1: {name: 'michael', favoriteDb: 'mongoDb', id: 1},
  2: {name: 'eric', favoriteDb: 'mySql', id: 2}
}

var databases = {
  'mongoDb': {dbType: 'non-relational'},
  'mySql': {dbType: 'relational'}
}

// CALLBACKS
function fetchUser(id, callback) {
  setTimeout(function(){
    if (users[id]) {
      callback(users[id])
    } 
    else {
      callback(null, 'that id did not exist')
    }
  }, 1000)
}

function fetchDbInfo(dbName, callback) {
  setTimeout(function(){
    if (databases[dbName]) {
      callback(databases[dbName])
    }
    else {
      callback(null, 'error')
    }
  }, 1000)
}

fetchUser(1, function(user){
  console.log(user)
  fetchDbInfo(user.favoriteDb, function(dbType){
    console.log(dbType)
    // fetchEvenMoreInfo(dbType, function(moreInfo) {
      
    // })
  })
})
