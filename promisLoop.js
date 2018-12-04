var users = {
  1: {name: 'michael', favoriteDb: 'mongoDb', id: 1},
  2: {name: 'eric', favoriteDb: 'mySql', id: 2}
}

var databases = {
  'mongoDb': {dbType: 'non-relational'},
  'mySql': {dbType: 'relational'}
}

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

var usersArray = [1, 2]

Promise.all(usersArray.map(function(user){ 
  return fetchUser(user)
}))
.then(function(results){
  console.log(results)
})