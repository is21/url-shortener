const apiKey = '37fb9fc99c6a423984723af859785c16'
const rebrandlyUrl = 'https://api.rebrandly.com/v1/links'

function copyToClipBoard() {
  document.getElementById("shortLink").addEventListener("click", function(){
    var copyText = document.getElementById("shortLink");
    copyText.select();
    document.execCommand("copy");
    showSnackbar('Short URL copied to clipboard');
});
}

function shortenUrl() {
  const longUrl = document.getElementById('longUrl').value;
  const data = JSON.stringify({destination: longUrl})
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.onreadystatechange = () => {
    console.log(xhr.response);
    if(xhr.readyState === XMLHttpRequest.DONE){
      renderResponse(xhr.response);
    }
    else {
      displayLoadingMessage();
    }
  }
  xhr.open('POST', rebrandlyUrl, true)
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.setRequestHeader('apikey', apiKey)
  xhr.send(data);
}

function renderResponse(res){
  if(res.errors){
    responseSection.innerHTML = "<p>Your URL couldn't be shortened. Try again, please.</p>"
  }
  else {
    responseSection.innerHTML = `<p>Your short URL is <textarea id="shortLink" cols="15"rows="1" readonly>${res.shortUrl}</textarea></p>`;
    copyToClipBoard();
  }
}

function displayLoadingMessage() {
  responseSection.innerHTML = "<p>Shortening your URL...</p>"
}

function showSnackbar(message) {
  var x = document.getElementById("snackbar");
  x.innerHTML = message;
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 4000);
}
