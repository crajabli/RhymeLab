
const searchField = document.querySelector('input[name="query-text"]');
const button = document.getElementById("enter");
const link = "https://rhymebrain.com/talk?function=getRhymes&word=";
const results = document.getElementById('results-paragraph');


button.addEventListener("click", async function(ev) {
    ev.preventDefault();
    const rhymeResultsResp = await fetch(
        `https://rhymebrain.com/talk?function=getRhymes&word=${searchField.value}`);
    console.log(rhymeResultsResp);
    const rhymeResults = await rhymeResultsResp.json();
    console.log(rhymeResults);
    let count = 10;
    begin();
    // rhymeResults.forEach(element => {
    //     // if (count > 0) {
    //     //     // begin();
    //     //     count--;
    //     // }
    //     // // document.getElementById("results").innerText = wordTemplate;
    //     // const printWords = rhymeResults.map(rhymeWord);
    //     // results.innerHTML = printWords.join("");
        
    // });
    
});




const rhymeWord = ({
    word,
    frequency,
    score, 
    flags, 
    syllables,
}) => {
    const wordTemplate = `
    <div id="${word}">
    <p style="font-size:${score / 3}px; padding: 20px;">${word}    </p>
    </div>
    `;
    return wordTemplate;
};
    

async function begin() {
    const rhymeResultsResp = await fetch(
        `https://rhymebrain.com/talk?function=getRhymes&word=${searchField.value}`);
    const rhymeResults = await rhymeResultsResp.json();
    const rhymeResultsElems = rhymeResults.map((rhymeWord) => {
        const resultElem = document.createElement('div');
        resultElem.classList.add('result');
        if (rhymeWord.score >= 300) {
            resultElem.classList.add('perfect');
        } else {
            resultElem.classList.add('imperfect');
        }
        resultElem.dataset.score = rhymeWord.score;
        resultElem.append(rhymeWord.word);
        //we should change the rhymoword to the word template
        //now add description with the word its on 
        return resultElem
    });
    const resultsContainer = document.getElementById("results");

    Array.from(resultsContainer.children).forEach((child) => {
        child.remove();
    });
    resultsContainer.append(...rhymeResultsElems);
    sizeTheWords();
        
}

sizeTheWords = () => {
    const resultsContainer = document.getElementById("results");
    const results = resultsContainer.children;
    for (let i = 0; i < results.length; i++) {
        results[i].style.fontSize = results[i].dataset.score / 3 + "px";
    }
}

async function description(word) {
    const rhymeResultsD = await fetch(`https://rhymebrain.com/talk?function=getWordInfo&word=${word}`);
    const rhymeResultsDes = await rhymeResultsD.json();
    const contain = documennt.getElementById(word);
    

}

const wordDisc = ({
    word,
    pron,
    ipa,
    freq,
    flags,
}) => {
    const descrip = 
    `
    <dl>
        <dt>phonetic transcription</dt>
        <dd>${pron}</dd>
        <dt>International Phonetic Alphabet</dt>
        <dd>${ipa}</dd>
    </dl>
    `;
    
}
// // write function that searches the rhyme API given a (string) query (likely you should use the fetch API)

// // write function that:
// //  1. expects array of word object results 
// //    that look like the spec says https://rhymebrain.com/api.html#rhyme
// //  2. creates DOM elements and inserts them into the page
