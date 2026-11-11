// ============================================
// Lesson 11 Tasks
// ===========================================

// ===========================================
// Task 11.1: Understanding Async 🟢
// ============================================   

// Exercise 1: Synchronous vs Asynchronous

// Synchronous - blocks until complete
console.log("1 - Start");
console.log("2 - Middle");
console.log("3 - End");
// Output: 1, 2, 3 (in order)

// Asynchronous - doesn't block
console.log("1 - Start");

setTimeout(() => {
    console.log("2 - This is delayed");
}, 2000);

console.log("3 - End");
// Output: 1, 3, then 2 (after 2 seconds)

// Predict the output 
console.log("A");

setTimeout(() => console.log("B"), 0);

console.log("C");

setTimeout(() => console.log("D"), 100);

console.log("E");

// What order will these print?
// Output: A, C, E, B, D

// Exercise 2: Callback Pattern

// Old-style callbacks
function fetchData(callback) {
    setTimeout(() => {
        const data = { name: "John", age: 30 };
        callback(data);
    }, 1000);
}

fetchData(function(data) {
    console.log("Data received:", data);
});

// Build: Create a function that simulates loading user data
function loadUser(userId, callback) {
    // Simulate 1.5 second database lookup
    // Call callback with user object
    setTimeout(() => {
        const user = { id: userId, name: "Cate" };
        callback(user);
    }, 1500);
}
loadUser(1, function(user) {
    console.log("User loaded:", user);
});
console.log("Loading user...");
 // output: Loading user..., then after 1.5 seconds: User loaded: { id: 1, name: "Cate" }   

 // =======================================================
 // Task 11.2: Callback Hell & Introduction to Promises 🟡
 // =======================================================

// Exercise 1: Experience Callback Hell

// This is BAD - "Callback Hell" or "Pyramid of Doom"

 function getUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() =>    {
            if (userId>0) {
                resolve({ id: userId, name: "John" });
            } else {
                reject(new Error("Invalid user ID"));
            }
        }, 1000);
    });
}


function getUserPosts(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve([
                    { id: 1, title: "Post 1" },
                    { id: 2, title: "Post 2" }
                ]);
            } else {
                reject(new Error("Invalid user ID"));
            }
        }, 1000);
    });
}

function getPostComments(postId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (postId > 0) {
                resolve([
                    { id: 1, text: "Great post!" },
                    { id: 2, text: "Thanks for sharing" }
                ]);
            } else {
                reject(new Error("Invalid post ID"));
            }
        }, 1000);
    });
}
   
getUserData(1)
    .then(user => console.log("Got:", user))
    .catch(err => console.log("Problem:", err.message));

// Exercise 2: Promises to the Rescue

// Creating a Promise
const myPromise = new Promise((resolve, reject) => {
    const success = true;
    
    setTimeout(() => {
        if (success) {
            resolve("It worked!");
        } else {
            reject("Something went wrong");
        }
    }, 1000);
});

// Using a Promise
myPromise
    .then(result => {
        console.log("Success:", result);
    })
    .catch(error => {
        console.log("Error:", error);
    });

