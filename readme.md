# JavaScript Promises Demo

1. Intro
1. Why do we even have asynchronous JavaScript?
1. Solution 1: Callbacks
1. Problems with callbacks
1. Solution 2: Promises

## 1. Intro
When I was first learning about JavaScript Promises I kept finding reference to "[callback hell](http://callbackhell.com/)" and was told Promises can save us from this.
And while that is true--Promises do make our code look neat by removing nesting--that is not where the true power of Promises lie. 

The following demo is intedended to review the asynchronous nature of JavaScript, understand why callbacks were needed in the first place, explore the _real_ problems with callbacks (it's not just nesting), learn how to create and use Promises, and finally, to fully grasp how they solve the problems introduced by callbacks. 

## 2. 🕒 Why do we even need asynchronous JavaScript?
Let's say we want to fetch some data from a database and that this fetching is going to take some amount of time. At first thought, it seems like we could just do it synchronously and just wait for the database to return our user before moving on to the rest of the code. 

```javascript 
function getUser(id) {
  var sql = "SELECT * FROM users WHERE id=?";
  var user = dbQuery(sql, id) // Blocking
  if (!user) throw new Error('error finding user')
  return user;
}
```
the problem with this (as indicated by the comments) is that the `dbQuery()` function is synchronous and thus blocking. 

❓ What's wrong with blocking? 

## 3. ☎️ Callbacks To the Rescue?
As you already know we can make this non blocking by re-writing the getUser function to accept a callback function. 
```javascript 
function getUser(id, callback) {
  var sql = "SELECT * FROM users WHERE id=?";
  dbQuery(sql, id, function(err, user) {
    if (!user) callback(err, null)
    else callback(null,user);
  }) 
}
```

## 4. What are some problems with this? 
❓ Compare this function with the first one. What have we lost here? (Hint: look at the keywords)

We've lost the ability to use `return` and `throw`. Who cares? Well since we've lost `return` and `throw` we've also lost our call stack. We've lost our place in the stack and are relying entirely on side effects (callbacks) for the execution of our code. When you use `return` and `throw` in synchronous functions, the code stops running. In other words, the code functions in a predictable manner. When we use callbacks on the otherhand, there could be code that runs after the callback, there's nothing stopping a callback from being executed twice...in short, there's no guarantees. 

So, in summary the problems we've created are...

  * Callback hell (fetching data that depends on previous data is hard)
  * We can't use `return` or `throw` (who cares?)

But also... 
  * Asynchronous loops can be hard  // IF we have time

And the problem we've solved is...our function isn't blocking anymore. 


## 5. 🤞 Promises to the rescue

We've already seen promises when we use jqeury's $.ajax method. 

```javascript
$.ajax({
  url: `api/user/${id}`,
}).then(function(user) {
  console.log(user)
})
.catch(function(err) {
  console.log(err)
};
```

Ok, but what exactly is a Promise and how is it different from a callback? 
According to MDN 
>  A Promise is a proxy for a value not necessarily known when the promise is created. It allows you to associate handlers with an asynchronous action's eventual success value or failure reason. This lets asynchronous methods return values like synchronous methods: instead of immediately returning the final value, the asynchronous method returns a promise to supply the value at some point in the future.

What the heck does that mean? Well let's look at our first example where we naively thought we could just wait for an asynchrnous value to be returned from our dbQuery function.
```javascript 
function getUser(id) {
  var sql = "SELECT * FROM users WHERE id=?";
  var user = dbQuery(sql, id) // Blocking
  if (!user) throw new Error('error finding user')
  return user;
}
``` 
Just like in synchronous code, functions that return promises return something immediately, a Promise object. At first the value of that object will be "pending" and then when the promise is fulfilled or rejected, `.then()` or `.catch()` will be triggered. But how are they triggered? What causes a promises to either be fulfilled or rejected. 

Let's write our own promise to see. 

```javascript
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
```
the first thing to note is that we're using the Promise constructor to build a Promise Object. the constructor takes a function, which in turn, takes two arguments, a resolve function and a reject function. `resolve()` and `reject()` are like `return` and `throw` respectively. Any code after a resolve or reject in a no-op and we can only resolve or reject once. Now we have some guarantees about how our code will behave rather than relying on the side-effect pattern that callbacks must use. 

N.B. resolve and reject can be named anything, however, I find the convention is to name them...resolve and reject. 


## 6. Resources
* https://www.youtube.com/watch?v=hf1T_AONQJU&feature=youtu.be

* https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html