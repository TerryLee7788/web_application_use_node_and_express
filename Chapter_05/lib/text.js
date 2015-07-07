var text = ['terry', 'betty', 'sinnie', 'karen', 'chris', 'len'];

exports.getText = function () {
  var idx = Math.floor(Math.random() * text.length);
  return text[idx];
};