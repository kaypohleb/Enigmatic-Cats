
var response;
fetch('https://api.thecatapi.com/v1/images/search',{
  method: 'GET',
  headers:{
    'x-api-key': '4c0af894-24d7-40ad-949a-6b8c7e317066'
  },
})
  .then(response => {
    return response.json()
  })
  .then(data => {
    console.log(data["0"]["url"])
    var html = '<img src="' + data[0]["url"] + '">';
    $("#image").html(html);
  })
  .catch(err => {
    // Do something for an error here
  })

