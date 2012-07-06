/**********************************************************/
//Check if we are on nzbmatrix.com or nzbxxx.com
var loc_nzbmatrix;

if (location.href.indexOf("nzbmatrix.com") != -1) {
    loc_nzbmatrix = 1;
}
else if (location.href.indexOf("nzbxxx.com") != -1) {
    loc_nzbmatrix = 1;
}
else {
    loc_nzbmatrix = 0;
}
/**********************************************************/

var nzbxxx_username;
var nzbxxx_apikey;

function findNZBIdMatrix(elem) {
   var url = $(elem).attr('href');
   
   var hostname = window.location.href.substr(0, window.location.href.indexOf('/', 8));
   if (hostname.indexOf('nzbxxx') != -1) {
      url = url.replace('nzb-download.php', 'v1.1/download.php') + '&apikey=' + nzbxxx_apikey + '&username=' + nzbxxx_username;

      if (hostname == "http://nzbxxx.com") {
        hostname = "http://api.nzbxxx.com";
      }
   } else {
      // 0.5+ needs nzb-details not nzb-download in url
      url = url.replace('nzb-download', 'nzb-details');
   }
   
   if (url.indexOf(hostname) == -1) {
      url = hostname + url
   }
   return url;
}

function addToSABnzbdFromNZBMatrix() {
   var nzbid = findNZBIdMatrix(this);
   if (nzbid) {
      // Set the image to an in-progress image
      var img = safari.extension.baseURI + 'images/sab2_16_fetching.png';
      $(this).find('img').attr("src", img);
      var addLink = this;
      
      //Construct message to send to background page
      var message = addLink + " " + nzbid + " " + "addurl";
      safari.self.tab.dispatchMessage("addToSABnzbd", message);
   }
   
   return false;
}

//Don't modify page if we aren't on nzbmatrix.com
if (loc_nzbmatrix) {
   // On search results (tabulated) pages:
   $('img[title="Download NZB"]').each(function() {
       // Change the title to "Send to SABnzbd"
       $(this).attr("title", "Send to SABnzbd");
       
       // Change the nzb download image
       var img = safari.extension.baseURI + 'images/sab2_16.png';
       $(this).attr("src", img);
      
       // Change the on click handler to send to sabnzbd
       // this is the <img>, parent is the <a>
       $(this).parent().click(addToSABnzbdFromNZBMatrix);
   });
}



//Get the NZBXXX data from common.js
safari.self.addEventListener("message", handleMessage, false);
safari.self.tab.dispatchMessage("get_nzbxxx_data", null);

function handleMessage(msgEvent) {
   var messageName = msgEvent.name;
   var messageData = msgEvent.message;
      
   if (messageName === "nzbxxx_username") {
      nzbxxx_username = messageData;
   }
   else if (messageName === "nzbxxx_apikey") {
      nzbxxx_apikey = messageData;
   }   
}
