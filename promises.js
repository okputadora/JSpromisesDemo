var users = {
  1: {name: 'michael', favoriteDb: 'mongoDb', id: 1},
  2: {name: 'eric', favoriteDb: 'mySql', id: 2}
}

var databases = {
  'mongoDb': {dbType: 'non-relational'},
  'mySql': {dbType: 'relational'}
}

// CALLBACKS
function fetchUser(id) {
  return new Promise(function(resolve, reject) {
    setTimeout(function(){
      if (users[id]) {
        resolve(users[id])
      } 
      else {
        reject(null, 'that id did not exist')
      }
    }, 1000)
  })
}

function fetchDbInfo(dbName) {
  return new Promise(function(resolve, reject) {
    setTimeout(function(){
      if (databases[dbName]) {
        resolve(databases[dbName])
      }
      else {
        reject(null, 'error')
      }
    }, 1000)
  })
}


fetchUser(1)
.then(function(user){
  console.log(user)
  return fetchDbInfo(user.favoriteDb)
})
.then(function(db) {
  console.log(db)
})
