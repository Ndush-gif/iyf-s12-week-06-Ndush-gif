function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function day1() {
    console.log("Day 1: waiting 2 seconds...");
    await delay(2000);
    console.log("This prints after 2 seconds");
}

function makeStep(name) {
    return () => new Promise(resolve => {
        const ms = Math.floor(Math.random() * 1000) + 500;
        setTimeout(() => resolve(`Step ${name} finished after ${ms}ms`), ms);
    });
}

const stepOne = makeStep("one");
const stepTwo = makeStep("two");
const stepThree = makeStep("three");

function day2() {
    const start = performance.now();
    stepOne()
        .then(result => {
            console.log(result);
            return stepTwo();
        })
        .then(result => {
            console.log(result);
            return stepThree();
        })
        .then(result => {
            console.log(result);
            console.log(`Total time: ${Math.round(performance.now() - start)}ms`);
        });
}

async function getUserOrDefault(id) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    if (response.status === 404) {
        return { id, name: "Default User", email: "unknown" };
    }
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

async function day3() {
    const realUser = await getUserOrDefault(1);
    console.log("Existing user:", realUser.name);
    const missingUser = await getUserOrDefault(9999);
    console.log("Missing user:", missingUser);
}

function fetchDataCallback(callback) {
    setTimeout(() => {
        const data = { name: "John", age: 30 };
        callback(data);
    }, 1000);
}

function fetchDataPromise() {
    return new Promise(resolve => {
        fetchDataCallback(resolve);
    });
}

async function day4() {
    const data = await fetchDataPromise();
    console.log("Data received:", data);
}

async function day5() {
    const resultsList = document.getElementById("results");
    resultsList.replaceChildren();

    function show(text) {
        const li = document.createElement("li");
        li.textContent = text;
        resultsList.appendChild(li);
    }

    const endpoints = [
        "https://jsonplaceholder.typicode.com/users/1",
        "https://jsonplaceholder.typicode.com/posts/1",
        "https://jsonplaceholder.typicode.com/comments/1"
    ];

    const requests = endpoints.map(url =>
        fetch(url).then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
    );

    requests.forEach((request, index) => {
        request.then(
            data => show(`Finished: ${endpoints[index]}`),
            error => show(`Failed: ${endpoints[index]} (${error.message})`)
        );
    });

    const settled = await Promise.allSettled(requests);
    const succeeded = settled.filter(result => result.status === "fulfilled").length;
    show(`All settled: ${succeeded} of ${settled.length} succeeded`);
}

const runners = { 1: day1, 2: day2, 3: day3, 4: day4, 5: day5 };

document.getElementById("buttons").addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    runners[button.dataset.day]();
});