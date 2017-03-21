fabric.Object.prototype.set({
    transparentCorners: false,
});

var canvas = new fabric.Canvas('c');

canvas.setBackgroundImage('../assets/sereno.png', canvas.renderAll.bind(canvas), {});

 var text = new fabric.Text("NEW TEXT", {
    fontFamily: "comicNeue",
    left: 150,
    top: 100,
    fontSize: 24,
    textAlign: "left",
    fill: "#ffffff"
});
canvas.add(text);

canvas.setHeight(2048);
canvas.setWidth(1349);
canvas.renderAll();
