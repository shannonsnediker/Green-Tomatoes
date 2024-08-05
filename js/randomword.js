async function grabWord() { 
    let apiEndPoint = 'https://wordsapiv1.p.rapidapi.com/words/?random=true'; // API endpoint variable
    let fetchOptions = { // Setting variable equal to the get method that pulls specified data from API
        method: 'GET',
        headers: { // Headers for authentication and host
            'X-RapidAPI-Key': 'cecffc0bb9mshfb79b292fb435adp1edc50jsn252712d6d654', 
            'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(apiEndPoint, fetchOptions); // Await the fetch request
        const data = await response.json(); // Await the parsing of the JSON response
        console.log(data);

        let grabbedWord = data.word;
        primary.push(grabbedWord); // Add the fetched word to the primary array
        console.log(primary);
    } catch (error) {
        console.error(error); // Handle any errors that occur during the fetch request or JSON parsing
    }
}

let primary = [];

let secondary = ['accept', 'above', 'acknowledge', 'across', 'act', 'action', 'admit', 'affect', 'along', 'announce', 'another', 'anymore', 'together', 'apart', 'a part of', 'approval', 'approximately', 'arise', 'arrant', 'arrive', 'ask', 'attack', 'attract', 'avoid'];

let tertiary = ['anyone', 'anything', 'I', 'me', 'we', 'you', 'us', 'a', 'the', 'it', 'it is', 'not', 'they', 'them'];

// Example usage: Call the grabWord function to fetch a word and update the primary array
// grabWord();


let displayWord = [] // an empty array for randomly selected strings from words variables to be pushed to

let z; // created an empty global variable so the data in selectPoemWords() can be used in other functions


function selectPoemWords(array) { //created a function with one argument that randomly selects a word from an arary and removes that selected word using the splice funciton. This funciton contains one parameter so that each object property can be passed through.
    
    let r = Math.random(); // set a variable r equal to the desired method
    let c = r * array.length; // set a new variable c equal to r times the array length to return a randomized element of the array
    let d = Math.floor(c); // set a new variable equal to the rounded number of c
    
    z = array[d]; //set the global variable z equal to the results of the randomized array element

    console.log(z)

    array.splice(d, 1); // removed the randomly selected word from the array using the splice method

    return z; // returns the result of this function to the global variable
}



// Async await function goes here
async function runForLoops() {
    
    for (let i = 0; i < 30; i++) { //created a for loop to iterate through the desired array and select 30 words from the object.primary property

        if (primary.length > 0) {
            displayWord.push(selectPoemWords(primary));
        } // passes the words.primary as an argument of the selectPoemWords function to randomly select the 30 words and then push those words to the displayWord array
    }
    
    for (let i = 0; i < 20; i++) { //created a for loop to iterate through the desired array and select 20 words from the object.secondary property
        if (secondary.length > 0) {
            displayWord.push(selectPoemWords(secondary));
        } // passes the words.secondary as an argument of the selectPoemWords function to randomly select the 20 words and then push those words to the displayWord array
    }
    
    for (let i = 0; i < 10; i++) { //created a for loop to iterate through the desired array and select 10 words from the object.tertiary property
        if (tertiary.length > 0) {
            displayWord.push(selectPoemWords(tertiary));
        } // passes the words.tertiary as an argument of the selectPoemWords function to randomly select the 10 words and then push those words to the displayWord array
    }
};

async function callAwaitFunctions() {
    for (let i = 0; i < 30; i++) { //created a for loop to loop thorugh api 30 times and pushes to words.primary array
        await grabWord();
    }

    await runForLoops();
}

callAwaitFunctions();


function outputDisplayWord() { // created a function to wrap each random word that was pushed to the displayWord array in a div, outputted to the dom, and then add an event listener so that each word is clickable.


    displayWord.forEach(arrayItem => {
        let node = document.createElement("div"); // created a node variable equal to a div element

        node.classList.add("targetWord") //added a class to each div

        let textNode = document.createTextNode(arrayItem); //created a text node with a parameter that will allow each array item of displayWord to be passed as an argument
        
        node.appendChild(textNode); // appends the div element created as a child to the textNode parent

        document.getElementById("displayWordsOnScreen").appendChild(node); //appends the node of the textNode to the div with the id displayWordsOnScreen

        node.addEventListener("click", function() { // adds a click event listener to each displayWord array element that then activates the addToPoem function passing that same array element as an argument
            addToPoem(arrayItem)
        })
    });

    
}


let poem = []; // an empty array for the clicked poem words to be displayed in

function addToPoem (clickedWord) { 
    poem.push(clickedWord); 
    updatePoemDisplay();
}

function updatePoemDisplay() {
    let poemDiv = document.getElementById("poem"); // Get the "poem" div
    poemDiv.innerHTML = ""; // Clear the "poem" div to reflect the current content

    let textarea = document.createElement("textarea"); // Create a textarea element
    textarea.setAttribute("id","completedPoem")

    textarea.textContent = poem.join(" "); // Set initial content as joined array elements with newline

    // Event listener to update array when content changes
    textarea.addEventListener('input', function() {
        poem = this.value.split(" "); // Update the array by splitting textarea value by newline
    });

    poemDiv.appendChild(textarea); // Append the textarea to the "poem" div
}


function deleteLastWord() { // function to delete the last word in the array
    if (poem.length > 0) {
        poem.pop(); // removed the last word from the poem array
        updatePoemDisplay(); // updated the poem display
    }
}

document.getElementById("deleteButton").addEventListener("click", deleteLastWord); // added an event listener to the delete button so that it calls the deleteLastWord() function on click