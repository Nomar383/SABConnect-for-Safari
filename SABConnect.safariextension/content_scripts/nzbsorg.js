/**********************************************************/
//Check if we are on nzbs.org
var loc_nzbsorg;

if (location.href.indexOf("nzbs.org") == -1) {
    loc_nzbsorg = 0;
}
else {
    loc_nzbsorg = 1;
}
/**********************************************************/

//Variable declarations
var rssURL;
var match;
var user;
var hash;
var lastLink;

//Don't check page if we aren't on nzbs.org
if (loc_nzbsorg) {

    // Scrape the users userid and hash to add to download links
    rssURL = $('link[title="RSS 1.0"]').attr('href');
    // These will fail if nzbs.org changes the RSS feed at all
    match = /i=([^&]*)/i.exec(rssURL);
    user = match[1];
    match = /h=([^&]*)/i.exec(rssURL);
    hash = match[1];
}

//http://nzbs.org/index.php?action=getnzb&nzbid=307942
function addToSABnzbdFromNZBORG() {
    var img = safari.extension.baseURI + 'images/sab2_16_fetching.png';
    $(this).find('img').attr("src", img);
    
    // Find the newzbin id from the href
    var url = 'http://nzbs.org/'
    var nzburl = url.concat($(this).attr('href'));
    // Add the authentication to the link about to be fetched
    nzburl += '&i=' + user;
    nzburl += '&h=' + hash;
    var addLink = this;
    
    //handle the repeat link sending issue
    if (!(lastLink == nzburl)) {
        lastLink = nzburl;
        
        //Construct message to send to background page
        var message = addLink + " " + nzburl + " " + "addurl";
        safari.self.tab.dispatchMessage("addToSABnzbd", message);
    }
    
    return false;

}

//Don't modify page if we aren't on nzbs.org
if (loc_nzbsorg) {

    // Loop through each download link and prepend a link+img to add to sabnzbd
    $('.dlnzb').each(function() {
        var img = safari.extension.baseURI + 'images/sab2_16.png';
        var href = $(this).attr('href');
        var link = '<a class="addSABnzbd" href="' + href + '"><img src="' + img + '" /></a> ';
        $(this).before(link);
        $('.addSABnzbd').click(addToSABnzbdFromNZBORG);
        
    });
}
