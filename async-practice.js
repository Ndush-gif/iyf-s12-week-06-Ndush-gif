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

//   // Exercise 2: Promises
    const myPromise = new Promise((resolve, reject) => {
        const success = true; // change to false to see .catch run
        setTimeout(() => {
            if (success) {
                resolve("It worked!");
            } else {
                reject("Something went wrong");
            }
        }, 1000);
    });
 
    await myPromise
        .then((result) => console.log("Success:", result))
        .catch((error) => console.log("Error:", error));
 
    // Test the reject cases
    await getUserData(0).catch((err) => console.log("Problem:", err.message));
    await getUserPosts(0).catch((err) => console.log("Problem:", err.message));
    await getPostComments(0).catch((err) => console.log("Problem:", err.message));

 
// ============================================
// Task 11.3: Promise Chaining
// ============================================
async function task113() {
    console.log("\n===== Task 11.3 =====");
 
    // Exercise 1: chain promises
    await getUserData(1)
        .then((user) => {
            console.log("User:", user);
            return getUserPosts(user.id);
        })
        .then((posts) => {
            console.log("Posts:", posts);
            return getPostComments(posts[0].id);
        })
        .then((comments) => {
            console.log("Comments:", comments);
        })
        .catch((error) => {
            console.error("Error:", error.message);
        });
 
    // Exercise 2: Promise.all (runs at the same time, about 1 second total)
    await Promise.all([getUserData(1), getUserData(2), getUserData(3)])
        .then((results) => {
            console.log("All users:", results);
            results.forEach((user) => console.log(`User ${user.id}: ${user.name}`));
        })
        .catch((error) => {
            console.error("One failed:", error.message);
        });
 
    // Exercise 3: Promise.race (first to finish wins)
    const fast = new Promise((resolve) => setTimeout(() => resolve("Fast!"), 100));
    const slow = new Promise((resolve) => setTimeout(() => resolve("Slow!"), 500));
 
    await Promise.race([fast, slow]).then((result) => {
        console.log("Winner:", result); // "Fast!"
    });
}
 
// ============================================
// Task 11.4: Async/Await
// ============================================
 
// Exercise 1: the promise chain rewritten with async/await
async function getDataWithAsync() {
    const user = await getUserData(1);
    const posts = await getUserPosts(user.id);
    const comments = await getPostComments(posts[0].id);
    return comments;
}
 
// Exercise 2: error handling with try/catch
async function fetchUserData(userId) {
    try {
        const user = await getUserData(userId);
        const posts = await getUserPosts(user.id);
        return { user, posts };
    } catch (error) {
        console.error("Failed to fetch:", error.message);
        throw error; // re-throw if needed
    }
}
 
// Exercise 3: parallel with async/await
async function getAllUsers() {
    const [u1, u2, u3] = await Promise.all([
        getUserData(1),
        getUserData(2),
        getUserData(3)
    ]);
    return [u1, u2, u3];
}
 
async function task114() {
    console.log("\n===== Task 11.4 =====");
 
    const comments = await getDataWithAsync();
    console.log("Comments:", comments);
 
    const data = await fetchUserData(1);
    console.log("User and posts:", data);
 
    try {
        await fetchUserData(0);
    } catch (error) {
        console.log("Caught in main:", error.message);
    }
 
    console.time("parallel");
    const users = await getAllUsers();
    console.timeEnd("parallel");
    console.log("All users:", users);
 
    // Build: the callback hell example rewritten with async/await
    // (this is getDataWithAsync above: flat, readable, one try/catch)
}
 
// ============================================
// Run everything in order
// ============================================
async function main() {
    await task111();
    await task112();
    await task113();
    await task114();
    console.log("\nAll Lesson 11 tasks done!");
}
 
main();
 
// ============================================
// Lesson 12 Tasks
// ============================================

// Task 12.1: Fetch API Basics 🟢
// Exercise 1: Your First Fetch
// Basic fetch
fetch("https://jsonplaceholder.typicode.com/users/1")
    .then(response => {
        console.log("Response object:", response);
        console.log("Status:", response.status);
        console.log("OK:", response.ok);
        return response.json();  // Parse JSON
    })
    .then(data => {
        console.log("User data:", data);
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });

    // Exercise 2: Fetch with Async/Await

async function getUser(id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch user:", error);
    }
}

// Use it — inside an async function. A top-level `await` only works in the
// DevTools Console or a <script type="module">; in a normal script file it is a SyntaxError.
async function main() {
    const user = await getUser(1);
    console.log(user);
}
main();

// Practice: Fetch and display:
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Failed to fetch from ${url}:`, error);
    }
    }


async function runPractice() {
// A single user from JSONPlaceholder
    const singleUser = await fetchData("https://typicode.com");
    console.log("1. Single User:", singleUser);
    console.log(`Name: ${singleUser.name}, Email: ${singleUser.email}`);

// All users (https://jsonplaceholder.typicode.com/users)
    const allUsers = await fetchData("https://typicode.com");
    console.log("\n2. All Users (Count):", allUsers.length);
    allUsers.forEach(user => {
        console.log(`- [${user.id}] ${user.name} (${user.address.city})`);
    });

// Posts for user 1 (https://jsonplaceholder.typicode.com/users/1/posts)
    const userPosts = await fetchData("https://typicode.com/posts");
    console.log("\n3. Posts for User 1 (Count):", userPosts.length);
    userPosts.forEach(post => {
        console.log(`- Post #${post.id}: ${post.title}`);
    });
}

// Run all three tasks
runPractice();

// Task 12.2: Display API Data in DOM 🟡

// Exercise: User Directory

const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const container = document.getElementById("users-container");

async function loadUsers() {
    try {
        showLoading();
        
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        
        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }
        
        const users = await response.json();
        displayUsers(users);
        
    } catch (error) {
        showError(error.message);
    } finally {
        hideLoading();
    }
}

function showLoading() {
    loading.classList.remove("hidden");
    container.innerHTML = "";
}

function hideLoading() {
    loading.classList.add("hidden");
}

function showError(message) {
    errorDiv.textContent = `Error: ${message}`;
    errorDiv.classList.remove("hidden");
}

// innerHTML is acceptable here because the data comes from an API you chose and
// you are not inserting anything a visitor typed. Anything typed by a user → textContent (Week 5).
function displayUsers(users) {
    container.innerHTML = users.map(user => `
        <div class="user-card">
            <h2>${user.name}</h2>
            <p>📧 ${user.email}</p>
            <p>🏢 ${user.company.name}</p>
            <p>📍 ${user.address.city}</p>
        </div>
    `).join("");
}

// Initialize
loadUsers();

// Task 12.3: POST Requests 🟡
// Exercise: Creating Resources

async function createPost(title, body, userId) {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title,
            body,
            userId
        })
    });
    
    if (!response.ok) {
        throw new Error("Failed to create post");
    }
    
    return response.json();
}

// Use it — inside an async function (see Task 12.1)
async function demo() {
    const newPost = await createPost(
        "My First Post",
        "This is the content of my post.",
        1
    );
    console.log("Created:", newPost);
}
demo();

// Build: Create a form that submits a new post and displays the result.

