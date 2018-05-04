# Reverse engineering the width computation of item popups
web.poecdn.com/js/main has a `updatePopupWidth` function which looks deminified
like this:
```javascript
function() {
  this.$el.css('position', 'relative'),
    this.$el.css('top', '0px'),
    this.$el.css('left', '0px'),
    this.$el.css('width', 'auto');
  var e = this.$el.find('.itemName:first'),
    t = 0;
  this.$el.find('.lc').each(function() {
    var e = n(this),
      r = e.outerWidth(!0) + 2;
    r > t && (t = r);
  }),
    this.$el.find('.descrText span, .secDescrText span').each(function() {
      var e = n(this),
        r = e.outerWidth(!0);
      r > o.MaxDescriptionWidth && (r = o.MaxDescriptionWidth),
        r > t && (t = r);
    }),
    this.$el.width(t + this.$el.outerWidth(!0) - this.$el.outerWidth(!0));
}
```
with some guesses the var names become
```javascript
function() {
  // this.$el is probably the popup container
  this.$el.css('position', 'relative');
  this.$el.css('top', '0px');
  this.$el.css('left', '0px');
  this.$el.css('width', 'auto');
  var element = this.$el.find('.itemName:first'); // looks unused
  var max_width = 0;
  // basically width of text lines e.g. requirements, mods, properties etc
  this.$el.find('.lc').each(function() {
    var element = jQuery(this);
    var width = element.outerWidth(true) + 2;
      if (width > max_width) {
        max_width = width;
      }
  });
  // description texts and secondary description text
  this.$el.find('.descrText span, .secDescrText span').each(function() {
    var element = jQuery(this),
      width = Math.min(o.MaxDescriptionWidth, element.outerWidth(true));
      if (width > max_width) {
        max_width = width;
      }
  });
  // looks like this is mostly for debugging
  // where one could switch true with false in on outerWidth() call
  // to add the margin of this.$el to the width calculation
  // currently this is equivalent to this.$el.width(width)
  this.$el.width(width + this.$el.outerWidth(true) - this.$el.outerWidth(true));
}
```