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

function findNZBIdMatrix(elem) {
    var url = $(elem).attr('href');

    // 0.5a6 needs nzb-details not nzb-download in url
    url = url.replace('nzb-download', 'nzb-details');
    
    return url;
}

function addToSABnzbdFromNZBMatrix() {

    //if(!gConfig.enable_nzbmatrix) {
    //   // If disabled, skip the dl
    //    return true;
    //}

    // Find the newzbin id from the href
    var nzbid = findNZBIdMatrix(this);
    if(nzbid) {
        // Set the image to an in-progress image
        var img = safari.extension.baseURI +'images/sab2_16_fetching.png';
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
