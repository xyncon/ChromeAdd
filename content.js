
$(document).ready(function() {
  if (GM.isGoogle()) {
    window.setTimeout(GM.init, 5000);
  }
});

var GM = (function() {
  var _data;
  var _blocksPattern;
  var _linkPattern;

  function _init() {
    _data = [
      {url: 'zalando.de', afl: 'ref=0815'},
      {url: 'justfab.de', afl: 'partner=0816'},
      {url: 'bauer.de', afl: 'rt=alkx'},
    ];

    _blocksPattern = [
      {block: '#tads li', headline: 'h3 a:last', linkAttr: 'href'},
      {block: '#ires .srg li', headline: 'h3 a:first', linkAttr: 'href'},
      {block: '#results .intrlu', headline: 'h3 a:first', linkAttr: 'data-href'},
    ];

    _linkPattern = /(http|https):\/\/(((\w|\.|-|\d)*)\.)*((\w|-|\d)*\.de)(\/.*)*/;
  }
  _init();

  function _scanBlocks(blocks, headline, linkAttr) {
    console.log(blocks, headline, linkAttr);
    
    var $blocks = $(blocks);
    $blocks.each(function() {
      var $headline = $(this).find(headline);
      var matches = $headline.attr(linkAttr).match(_linkPattern);
      console.log(matches);
    });
  }

  function init() {
    _.each(_blocksPattern, function(bp) {
      _scanBlocks(bp.block, bp.headline, bp.linkAttr);
    });
  }

  function isGoogle() {
    var url = window.location.href;
    var pattern = /https:\/\/www\.google\.*/;

    return url.match(pattern) ? true : false;
  }

  return {
    init: init,
    isGoogle: isGoogle,
  };
})();