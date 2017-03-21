fabric.Object.prototype.set({
    transparentCorners: false,
});

var canvas = new fabric.Canvas('c')
,btn = document.querySelector("#render")
,del = document.querySelector("#delete")
,textarea = document.querySelector("textarea")
,text_arr = []
;

function renderAll(){
  canvas.renderAll();
}

function setStyle(object, styleName, value) {
  if (object.setSelectionStyles && object.isEditing) {
    var style = { };
    style[styleName] = value;
    object.setSelectionStyles(style).setCoords();
  }
  else {
    object[styleName] = value;
  }
  renderAll();
}

function  getStyle(object, styleName) {
  return (object.getSelectionStyles && object.isEditing)
    ? object.getSelectionStyles()[styleName]
    : object[styleName];
}

function addHandler(id, fn, eventName) {
  document.getElementById(id)[eventName || 'onclick'] = function() {
    var el = this;
    if (obj = canvas.getActiveObject()) {
      fn.call(el, obj);
      canvas.renderAll();
    }
  };
}

function setBackground(){
  canvas.setBackgroundImage('../assets/sereno.jpg', canvas.renderAll.bind(canvas), {});
  canvas.setHeight(2048);
  canvas.setWidth(1349);

  renderAll();
}

function pushText(text){
  if( text_arr.indexOf(text) == -1 ){
    text_arr.push(text);
    return true;
  }

  return false;
}

function renderText(text){
  if ( pushText(text) ){
    var vineta = new fabric.IText(text, {
      fontFamily: "comicNeue",
      left: 50,
      top: 50,
      fontSize: 36,
      textAlign: "left",
      fill: "#ffffff"
    });

    setTimeout(function(){
      canvas.add(vineta);
    }, 500);

    renderAll();
  };
}

function renderAllText(){
  textarea.value
    .split("\n\n")
    .map(function(x){
      var text = x.trim();
      if (text){
        renderText(text);
      }
    });
  renderAll();
}

function deleteSelected(){
  canvas.getActiveObject().remove();
}

function init(){
  btn.addEventListener('click', renderAllText);
  textarea.addEventListener('blur', renderAllText);
  del.addEventListener('click', deleteSelected);
  setBackground();

  addHandler('color', function(obj) {
    setStyle(obj, 'fill', this.value);
  }, 'onchange');

  addHandler('opacity', function(obj) {
    setStyle(obj, 'opacity', this.value);
  }, 'onchange');

  addHandler('font-family', function(obj) {
    setStyle(obj, 'fontFamily', this.value);
  }, 'onchange');

  addHandler('text-align', function(obj) {
    setStyle(obj, 'textAlign', this.value);
  }, 'onchange');

  addHandler('text-bg-color', function(obj) {
    setStyle(obj, 'textBackgroundColor', this.value);
  }, 'onchange');

  addHandler('text-lines-bg-color', function(obj) {
    setStyle(obj, 'backgroundColor', this.value);
  }, 'onchange');

  addHandler('text-stroke-color', function(obj) {
    setStyle(obj, 'stroke', this.value);
  }, 'onchange');

  addHandler('text-stroke-width', function(obj) {
    setStyle(obj, 'strokeWidth', this.value);
  }, 'onchange');

  addHandler('text-font-size', function(obj) {
    setStyle(obj, 'fontSize', this.value);
  }, 'onchange');

  addHandler('text-line-height', function(obj) {
    setStyle(obj, 'lineHeight', this.value);
  }, 'onchange');

  addHandler('text-cmd-bold', function(obj) {
    setStyle(obj, 'fontWeight', this.value);
  }, 'onchange');

  addHandler('text-cmd-italic', function(obj) {
    setStyle(obj, 'italic', this.value);
  }, 'onchange');

  addHandler('text-cmd-underline"', function(obj) {
    setStyle(obj, 'underline', this.value);
  }, 'onchange');

  addHandler('text-cmd-linethrough', function(obj) {
    setStyle(obj, 'line-through', this.value);
  }, 'onchange');

  addHandler('text-cmd-overline', function(obj) {
    setStyle(obj, 'overline', this.value);
  }, 'onchange');

}


init();
