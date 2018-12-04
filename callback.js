var users = {
  1: {name: 'michael', favoriteDb: 'mongoDb', id: 1},
  2: {name: 'eric', favoriteDb: 'mySql', id: 2}
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

fetchUser(1, function(user, error){
  if (error) console.log(error)
  console.log(user)
})

