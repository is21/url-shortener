const apiKey = '37fb9fc99c6a423984723af859785c16'
const rebrandlyUrl = 'https://api.rebrandly.com/v1/links'


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
  }
  xhr.open('POST', rebrandlyUrl, true)
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.setRequestHeader('apikey', apiKey)
  xhr.send(data);
}

function renderResponse(res){
  if(res.errors){
    responseField.innerHTML = "<p>Your URL couldn't be shortened. Try again, please.</p>"
  }
  else {
    responseField.innerHTML = `<p>Short URL: ${res.shortUrl}</p>`;
  }
}
