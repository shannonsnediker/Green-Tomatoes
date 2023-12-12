#My APIS

## Merriam-Webster Thesaurus

I use this API in the free-write.js or in the create section of the nav. The usage is simple: users can input a word they desire to know synonyms of. The results will be outputted to the screen for them. Usage of this API in postman is also simple as it does not have any custom headers. Perform a GET request and paste the API url with your key in the URL section. Note that the word you would like searched for must be edited in the actual URL if you are using Postman. To select the desired word in my js file, I passed a param through the URL.

## WordsAPI

I use this API in the randomword.js or in the play section of the nav. I run a loop that calls the API 30 times to randomly select a word and display it on the screen for the user to use in their poem. In Postman perform a get request and paste the URL. This API has two custom headers:  'X-RapidAPI-Key': 'your key',
'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'