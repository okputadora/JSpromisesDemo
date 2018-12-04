var users = {
  1: {name: 'michael', favoriteDb: 'mongoDb', id: 1},
  2: {name: 'eric', favoriteDb: 'mySql', id: 2}
}

var ids = [0, 3]
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


function callbackLoop(dataToFetch, callback) {
  var users = [];
  dataToFetch.forEach(function(id, i) {
    fetchUser(id, function(user, error){
      if (user) {
        users.push(user)
      }
      else if (error) {
        throw new Error('we couldnt find a user with that id')
      }
      if (i === dataToFetch.length - 1) {
        callback(users)
      }
    })
  })
}

callbackLoop(ids, function(result){
  console.log(result);
})