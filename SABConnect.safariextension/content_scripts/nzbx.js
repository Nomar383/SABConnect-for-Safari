/**********************************************************/
//Check if we are on nzbx
var loc_nzbx;

if (location.href.indexOf("nzbx.co") == -1) {
    loc_nzbx = 0;
}
else {
    loc_nzbx = 1;
}
/**********************************************************/

function addToSABnzbdFromNZBX() {

    // Set the image to an in-progress image
    var img = safari.extension.baseURI + 'images/sab2_16_fetching.png';
    $(this).find('img').first().attr("src", img);
    
	var nzburl = $(this).attr('href');
	
    //Add domain info to nzburl
    nzburl = "https://nzbx.co" + nzburl;
    
    //Construct message to send to background page
    var message = nzburl + " " + nzburl + " " + "addurl";
    safari.self.tab.dispatchMessage("addToSABnzbd", message);
    
    return false;
}

//Don't check page if we aren't on nzbx.co
if (loc_nzbx) {
	$("a[href^='/nzb?']").each(function() {
		var img = safari.extension.baseURI + 'images/sab2_16.png';
		var href = $(this).attr('href');
		var link = $('<a class="addSABnzbd" href="' + href + '"><img title="Send to SABnzbd" src="' + img + '" /></a>');
		link.click(addToSABnzbdFromNZBX);
		var wrap = $("<span></span>");
		wrap.append(link);
		$(this).after("<br>", wrap);
	});
}