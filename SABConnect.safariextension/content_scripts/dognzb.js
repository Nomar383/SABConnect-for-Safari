/**********************************************************/
//Check if we are on dognzb
var loc_dognzb;

if (location.href.indexOf("dognzb.cr") == -1) {
    loc_dognzb = 0;
}
else {
    loc_dognzb = 1;
}
/**********************************************************/

var nzburl;

function findNZBId(elem) {
	nzbid = $(elem).attr('id');
	url = '/fetch/' + nzbid;
	return url;
}

function addToSABnzbdFromDognzb() {
	var rss_hash = $('input[name="rsstoken"]').val();
    
    nzburl = findNZBId(this);
    if (nzburl) {
        // Set the image to an in-progress image
        var img = safari.extension.baseURI + 'images/sab2_16_fetching.png';
        $(this).css('background-image', 'url('+img+')');
        
        // Add the authentication to the link about to be fetched
        nzburl += '/' + rss_hash;
        
        //Add domain info to nzburl
        nzburl = "https://dognzb.cr" + nzburl;
        
        //Construct message to send to background page
        var message = nzburl + " " + nzburl + " " + "addurl";
        safari.self.tab.dispatchMessage("addToSABnzbd", message);

        return false;
    }
}

//Don't check page if we aren't on dognzb
if (loc_dognzb) {
	$('div[class="dog-icon-download "]').each(function() {
		// Change the title to "Send to SABnzbd"
		$(this).attr("title", "Send to SABnzbd");

		// Change the nzb download image
		var img = safari.extension.baseURI + 'images/sab2_16.png';
		$(this).css('background-image', 'url('+img+')');
		$(this).css('background-position', '0 0');
		
		// Extract NZB id from onClick and set to ID attribute
		
		var nzbid = $(this).attr('onClick');
		var nzbid = nzbid.split('\'')[1];
		$(this).attr("id", nzbid);

		// Change the on click handler to send to sabnzbd
		// this is the <a>
		$(this).removeAttr("onClick");
		$(this).click(addToSABnzbdFromDognzb);
	});
}
