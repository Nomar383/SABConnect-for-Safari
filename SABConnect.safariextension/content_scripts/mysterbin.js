/**********************************************************/
//Check if we are on mysterbin.com
var loc_mysterbin;

if (location.href.indexOf("mysterbin.com") == -1) {
    loc_mysterbin = 0;
}
else {
    loc_mysterbin = 1;
}
/**********************************************************/

function addToSABnzbdFrommysterbin() {
    // Set the image to an in-progress image
    var img = safari.extension.baseURI +'images/sab2_16_fetching.png';
    $(this).attr("src", img);
    
    var nzburl = 'http://mysterbin.com/' + $(this).parent().attr('href');
    var addLink = $(this).parent();
    	
    //Construct message to send to background page
    var message = nzburl + " " + nzburl + " " + "addurl";
    safari.self.tab.dispatchMessage("addToSABnzbd", message);
    
    return false;
}

function addToSABnzbdFromCheckboxMysterbin(checkbox){
        
        var link = $(checkbox).next('a');
        var img = safari.extension.baseURI + 'images/sab2_16_fetching.png';
        $(link).find('img').attr("src", img);
        // Uncheck the download
        $(checkbox).attr('checked', '');
       
        var nzburl = 'http://mysterbin.com/' + $(link).attr('href');
        //Construct message to send to background page
        var message = nzburl + " " + nzburl + " " + "addurl";
        safari.self.tab.dispatchMessage("addToSABnzbd", message);
}

//Don't modify page if we aren't on mysterbin.com
if (loc_mysterbin) {
        
        $('img[title="Download NZB for this collection"]').each(function() {
                // Change the title to "Send to SABnzbd"
                $(this).attr("title", "Send to SABnzbd");
                
                // Change the nzb download image
                var img = safari.extension.baseURI + 'images/sab2_16.png';
                $(this).attr("src", img);

                // Change the on click handler to send to sabnzbd
                $(this).click(addToSABnzbdFrommysterbin);         
        });
        
        // Add a send to SABnzbd button to send multiple posts
        if(document.URL.indexOf('/detail?') == -1) {
            $('<button id="sendMultiple">Send to SABnzbd</button>').insertBefore('table.t');
            
            $('#sendMultiple').click(function(){
                $('table.t input:checkbox:checked').each(function(){
                    addToSABnzbdFromCheckboxMysterbin(this);
                });
            });
           
            
        }
        else{
            // Single post page
            $('img[alt="nzb"]').each(function() {
                // Change the title to "Send to SABnzbd"
                $(this).attr("title", "Send to SABnzbd");
                
                // Change the nzb download image
                var img = safari.extension.baseURI + 'images/sab2_16.png';
                $(this).attr("src", img);

                // Change the on click handler to send to sabnzbd
                $(this).click(addToSABnzbdFrommysterbin);         
            }); 
        }
}