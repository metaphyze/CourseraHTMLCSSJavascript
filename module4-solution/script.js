(function () {
  /*
  Hello Yaakov
  Good Bye John
  Good Bye Jen
  Good Bye Jason
  Hello Paul
  Hello Frank
  Hello Larry
  Hello Paula
  Hello Laura
  Good Bye Jim
  */
  
  var names = ["Yaakov", "John", "Jen", "Jason", "Paul", "Frank", "Larry", "Paula", "Laura", "Jim"];
  
  for (var inx=0; inx < names.length; inx++) {
  
    var firstLetter = names[inx].toLocaleLowerCase().charAt(0);
  
    if (firstLetter == 'j') {
      byeSpeaker.speak(names[inx])
    } else {
      helloSpeaker.speak(names[inx])
    }
  }
})();
