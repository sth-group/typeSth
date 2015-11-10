var typeSth = {
  orphantsList: [],
  what: '',
  store: [],
  type: 'q',
  elLength: 5
}

typeSth.orphantsLib = ['the', 'a'];
typeSth.charsLib = ['.', ',', ':', ';', '"', '!', '<', '>'];

// find predefined blocks of text and split them into an array
// so you can manipulate on this
typeSth.launch = function(what) {
  typeSth.what = what;
  for (var i = 0, len = $(what).length; i < len; i++) {
      var ele = $(what).eq(i).html().split(" ");
      typeSth.store.push(ele);
      typeSth.manipulate(ele, i);
  }
}
typeSth.lenghtChck = function(ele) {
    if(ele.length <= typeSth.elLength && ele.substr(0,1) !== '<') {
        return true;
    } else {
        return -1;
    }
}
// detect orphants
typeSth.manipulate = function(arr, index) {
  var orphantslist = [];
  for (var i = 0, len = arr.length; i < len; i++) {
    var orphantDetect;
    switch (typeSth.type) {
        case 'q':
            orphantDetect = typeSth.lenghtChck(arr[i]);
            break;
        default:
            orphantDetect = typeSth.orphantsLib.indexOf(arr[i]);
    }
    switch (orphantDetect) {
      case -1:
        break;
      default:
        orphantslist.push({o: arr[i], i: i});
    }
  }
  typeSth.orphantsList.push(orphantslist);
  typeSth.hardSpace(index);
}

// add hardspace after each orphant.
typeSth.hardSpace = function (index) {
  var thisList = typeSth.orphantsList[index],
      thisBlock = typeSth.store[index],
      edited = [];
  for (var idx = 0, len = thisList.length; idx < len; idx++) {
    var ele = thisList[idx];
    thisBlock[ele.i] = ele.o+"&nbsp;";
    edited.push(ele.i);
  }

  for (var idx = 0, len = thisBlock.length; idx < len; idx++) {
    var detectEdition = edited.indexOf(idx);
    switch (detectEdition) {
      case -1:
        thisBlock[idx] = thisBlock[idx]+" ";
        break;
    }
  }

  function escapeSpaces(value) {
    if(value == " ") {
      return false;
    } else {
      return true;
    }
  }

  thisBlock = thisBlock.filter(escapeSpaces);
  typeSth.store[index] = thisBlock;
  // console.log(typeSth.store[index])
  $(typeSth.what).eq(index).html(thisBlock.join(''));
}



typeSth.launch('p');
