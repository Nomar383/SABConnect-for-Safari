function checkEndSlash(input) {
    if (input.charAt(input.length-1) == '/') {
        return input;
    } else {
        var output = input+'/';
        return output;
    }
}

function constructApiUrl() {
    return checkEndSlash(safari.extension.settings.getItem("sab_url")) + 'api';
}

// hasJsConfig = has local html javascript
function constructApiPost(hasJsConfig) {

    var apikey = safari.extension.settings.getItem("api_key");
    var username = safari.extension.settings.getItem("username");
    var password = safari.extension.secureSettings.getItem("password");
    var default_cat = safari.extension.settings.getItem("default_category");
    
    var data = {};
    
    if (apikey) {
        data.apikey = apikey;
    }
    
    if (username) {
        data.ma_username = username;
    }
    
    if (password) {
        data.ma_password = password;
    }
    
    if (default_cat) {
        data.cat = default_cat;
    }
    
    return data;
}

function addToSABnzbd(addLink, nzb, mode) {

    
    // This is currently run by a content script
    // Should change it to run in background.html
    // The error function is always called - even on success, probably due to this
    var sabApiUrl = constructApiUrl();
    var data = constructApiPost(false);
    data.mode = mode;
    data.name = nzb;
    $.ajax({
        type: "GET",
        url: sabApiUrl,
        dataType: 'json',
        data: data,
        success: function(data) {
        
            /*// If there was an error of some type, report it to the user and abort!
            if(data.error) {
                var img = chrome.extension.getURL('images/sab2_16_red.png');
                $(addLink).find('img').attr("src", img);
                alert(data.error);
            }*/
        
            var img = safari.extension.baseURI + 'images/sab2_16_green.png';
            $(addLink).find('img').attr("src", img);
        },
        error: function() {
            // This seems to get called on a success message from sabnzbd.
            //var img = chrome.extension.getURL('sab2_16_red.png');
            var img = safari.extension.baseURI + 'images/sab2_16_green.png';
            $(addLink).find('img').attr("src", img);
            
            //alert("Could not contact SABnzbd \n Check it is running and your settings are correct");
        }
    });  
}

//Function to respond and pass message from injected javascript
function respondToMessage(theMessageEvent) {
    if(theMessageEvent.name === "addToSABnzbd")
    {
       var message_array = theMessageEvent.message.split(" ");
       var addLink = message_array[0];
       var nzbid = message_array[1];
       var mode = message_array[2];
       addToSABnzbd(addLink,nzbid,mode);
    }
}

//Add Listener to respond to injected javascript
safari.application.addEventListener("message",respondToMessage,false);
