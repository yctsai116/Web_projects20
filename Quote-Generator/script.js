const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const autorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

//  Get Quote From API
async function getQuote() {
  showLoadingSpinner();
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    // Check if author is blank and replace it with 'Unknown
    if (data.quoteAuthor === "") {
      autorText.innerText = "Unknown";
    } else {
      autorText.innerText = data.quoteAuthor;
    }
    // Dynamically reduce font size for long quotes
    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.quoteText;
    removeLoadingSpinner();
  } catch (error) {
    // Sometimes, this api has specific error for some quote,
    // as a result, we run the function again.
    getQuote();
    console.log(
      "Be patient, sometimes it take several times to fetch the api successfully (due to proxy api)",
      error
    );
  }
}

// Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = autorText.innerText;
  // `` means a template
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuote();
