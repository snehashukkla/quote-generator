 const quoteContainer=document.getElementById('quote-container');
 const quoteText=document.getElementById('quote');
 const authorText=document.getElementById('author');
 const twitterBtn=document.getElementById('twitter');
 const newQuoteBtn=document.getElementById('new-quote');
const loader=document.getElementById('loader');


let apiQuotes=[];
//show loadding

function loading(){
  loader.hidden=false;
  quoteContainer.hidden=true;
}
//hide loading

function complete(){
  quoteContainer.hidden=false;
  loader.hidden=true;
}


//new quote
function newQuote(){
  loading();
  const quote=apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
if(!quote.author)
authorText.textContent='Unknown';
else
authorText.textContent=quote.author;
//check quote len
if(quote.text.length>100)
quoteText.classList.add('long-quote');
else
quoteText.classList.remove('long-quote');
//set quote
quoteText.textContent=quote.text;
complete();

}

async function getQuotes(){
  loading();
    const apiUrl='https://type.fit/api/quotes';
    try{
        const respose=await fetch(apiUrl);
        apiQuotes=await respose.json();
        newQuote();
    }
    catch(error)
    {

    }
    //onload
   
}

function tweetQuote(){
  
  const twitterUrl=`https://twitter.com/intent/tweet?texxxt=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl,'_blank');

}

//events
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);

getQuotes();
