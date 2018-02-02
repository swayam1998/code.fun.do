var urlbtn = document.getElementById("ImgUrl");
var imageurl = document.getElementById("ImgUrlInput");
function saveUrl(){
  var database = firebase.database().ref();
if(url1 != ''){
  var url1 = imageurl.value;
  var newPostKey = database.child('ImagesUrl').push(url1).key;
  $(function() {
     // No query string parameters for this API call.
     var params = { };


     $.ajax({
         // NOTE: You must use the same location in your REST call as you used to obtain your subscription keys.
         //   For example, if you obtained your subscription keys from westcentralus, replace "westus" in the
         //   URL below with "westcentralus".
         url: "https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize?" + $.param(params),
         beforeSend: function(xhrObj){
             // Request headers, also supports "application/octet-stream"
             xhrObj.setRequestHeader("Content-Type","application/json");

             // NOTE: Replace the "Ocp-Apim-Subscription-Key" value with a valid subscription key.
             xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","1aafad0959524de9bb7bfc6f204fe444");
         },
         type: "POST",
       //Request body
         data: '{"url": "imageurl"}',
     }).done(function(data) {
         // Get face rectangle dimensions
         var faceRectangle = data[0].faceRectangle;
         var faceRectangleList = $('#faceRectangle');

         // Append to DOM
         for (var prop in faceRectangle) {
             faceRectangleList.append("<li> " + prop + ": " + faceRectangle[prop] + "</li>");
         }

         // Get emotion confidence scores
         var scores = data[0].scores;
         var scoresList = $('#scores');

         // Append to DOM
         for(var prop in scores) {
             scoresList.append("<li> " + prop + ": " + scores[prop] + "</li>")
         }
     }).fail(function(err) {
         alert("Error: " + JSON.stringify(err));
     });
 });

}
}
