# JavaScript Promises Demo

1. Intro
1. Why do we even have asynchronous JavaScript?
1. Solution 1: Callbacks
1. Problems with callbacks
1. Solution 2: Promises

## 1. Intro
When I was first learning about JavaScript Promises I kept finding reference to "[callback hell](http://callbackhell.com/)" and was told Promises can save us from this.
And while that is true, Promises make our code look neat by removing nesting, that is not where the true power of Promises lie. 

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
the problem with this (as indicated by the comments) is that the `dbQuery()` function is synchronous and thus blocking. What's wrong with blocking? 

## 3. ☎️ Callbacks To the Rescue!
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

We've lost the ability to use `return` and `throw`. Who cares? Well since we've lost `return` and `throw` we've also lost our call stack. We've lost our place in the stack and are relying entirely on side effects (callbacks) for the execution of our code. 

So, in summary the problems we've created are...

  * Callback hell (fetching data that depends on previous data is hard)
  * We can't use `return` or `throw` (who cares?)

But also... 
  * Asynchronous loops are hard

And the problem we've solved is...our function isn't blocking anymore. 


## 5. 🤞 Promises to the rescue

Promises to the rescue. 

We've already seen promises when we use jqeury's $.ajax method. 


```javascript
$.ajax({
  url: `api/user/${id}`,
}).then(function(user) {
  console.log(user)
});
```
`.then()` 

How can we write our own promises? 


## 6. Resources
https://www.youtube.com/watch?v=hf1T_AONQJU&feature=youtu.be
https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html