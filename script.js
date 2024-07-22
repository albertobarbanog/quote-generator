const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

//Show Loading
function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function removeLoeadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Show New Quote, API VERSION
let apiQuotes = [];

function newQuote() {
  showLoadingSpinner();
  // Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check if Author field is blank and replace it with 'Unknown'
  if (!quote.author || quote.author === "type.fit") {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author.replace(/, type\.fit$/, "");
  }
  // Check Quote Length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
  removeLoeadingSpinner();
}

// Show New Quote, Local Version
// function newQuote() {
//   // Loader
//   loading();
//   // Pick a random quote from apiQuotes array
//   const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
//   // Check if Author field is blank and replace it with 'Unknown'
//   if (!quote.author) {
//     authorText.textContent = "Unknown";
//   } else {
//     authorText.textContent = quote.author.replace(/, type\.fit$/, "");
//   }
//   // Check Quote Length to determine styling
//   if (quote.text.length > 120) {
//     quoteText.classList.add("long-quote");
//   } else {
//     quoteText.classList.remove("long-quote");
//   }
//   // Set Quote, Hide Loader
//   quoteText.textContent = quote.text;
//   complete();
// }

// Get Quotes From API
async function getQuotes() {
  // Loader
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // Catch Error Here
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank"); // Allow Twitter in new TAB
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotes();
// newQuote();
