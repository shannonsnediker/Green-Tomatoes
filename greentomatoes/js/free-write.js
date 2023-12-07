let wordId;
let apiEndPoint;
let fetchedData;
let syns = [];

function getThesaurus(wordId) {

    wordId = document.getElementById('wordId').value;
   
    let apiEndPoint = `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${wordId}?key=2d4c6f09-4760-4ad5-9568-09ad7fa9104f`;

    console.log(apiEndPoint)
  
    fetch(apiEndPoint)
      .then(response => {
        return response.json();
      })
      .then(data => {
        fetchedData = data;
        syns = fetchedData[0].meta.syns[0];
        console.log(data);
        // Process the received data
        displaySyns();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

function displaySyns() {

    let list = document.getElementById("displaySyns");

    syns.forEach((item) => {
        let li = document.createElement("li");
        li.innerText = item;
        list.appendChild(li);
    })
}




