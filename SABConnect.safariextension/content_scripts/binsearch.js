/**********************************************************/
//Check if we are on binsearch.info
var loc_binsearch;

if (location.href.indexOf("binsearch.info") == -1 && location.href.indexOf("binsearch.net") == -1 ) {
    loc_binsearch = 0;
}
else {
    loc_binsearch = 1;
}

/**********************************************************/

function addToSABnzbdFromBinsearch() {

    var img = safari.extension.baseURI +'images/sab2_16_fetching.png';
    $(this).attr("src", img);
    if ($(this).find('img').length > 0) {
	    $(this).find('img').attr("src", img);
	} else {
		$(this).css('background-image', 'url('+img+')');
	}
	var addLink = $(this).parent();
    //grab all checked boxes on page
	var a = document.getElementsByTagName('input');
	for (var i=0, len=a.length; i<len; ++i) {
		if (a[i].type == 'checkbox' && a[i].checked) {         
            var message =  'http://binsearch.info/?action=nzb&' + a[i].name + '=1' + " " +  'http://binsearch.info/?action=nzb&' + a[i].name + '=1' + " " + "addurl";
            safari.self.tab.dispatchMessage("addToSABnzbd", message);
		}
	}
	return false;
    
}

function handleAllDownloadLinks() {
       $('input[name$="watchlist"]').each(function() {
		// add button to h3 to move checked in to SABConnect
		var img = safari.extension.baseURI + 'images/sab2_16.png';
        $(this).attr("src", img);
		var link = '<input class="b addSABnzbd" type="button" value="    Download selected" style="background-image: url('+img+'); background-repeat: no-repeat; background-position: 3px 3px;" />';
		$(this).after(link);
		$(this).parent().find('input[class="b addSABnzbd"]').first().click(addToSABnzbdFromBinsearch);
	});
        return;
}

//Don't modify page if we aren't on binsearch.com
if (loc_binsearch) {
    handleAllDownloadLinks();
}