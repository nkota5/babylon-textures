var canvas = document.getElementById("renderCanvas");

var startRenderLoop = function (engine, canvas) {
    engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera) {
            sceneToRender.render();
        }
    });
}

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };
var createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    //color background black
    scene.clearColor = new BABYLON.Color3.FromHexString('#000');


    //create sphere w params (x, y, z, diameter)
    var s1 = createSphere(-1, 1, -1, 2);

    //wrap sphere in material from URL file
    s1.material = fileMat('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/20ce3c6f-5318-4c18-98f0-598d1ebfdbb8/d2eetcd-cd41d545-dfe1-46e5-af76-18b964e314e6.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzIwY2UzYzZmLTUzMTgtNGMxOC05OGYwLTU5OGQxZWJmZGJiOFwvZDJlZXRjZC1jZDQxZDU0NS1kZmUxLTQ2ZTUtYWY3Ni0xOGI5NjRlMzE0ZTYuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.o0ZLeXCLap-tFzP31uucopNZKsHw1MXm1oE2qfTfIdI', scene);
    
    //create sphere
    var s2 = createSphere(2, 2, 0.5, 2);

    //wrap sphere in material from local file
    s2.material = fileMat('life.jpg', scene);
    
    //create box with params x, y, z, width, height, ddepth
    var b1 = createBox(2, -2, 2, 1, 1, 1);

    //wrap box in material colored with hex code
    b1.material = hexMat('#00ff00');
    b1.rotation.z += Math.PI/4;

    var b2 = createBox(0, -2, -1.5, 2, 2, 2);

    //wrap box in material from local file
    b2.material = fileMat('eyes.jpeg');

    return scene;
};
        window.initFunction = async function() {
            
            
            var asyncEngineCreation = async function() {
                try {
                return createDefaultEngine();
                } catch(e) {
                console.log("the available createEngine function failed. Creating the default engine instead");
                return createDefaultEngine();
                }
            }

            window.engine = await asyncEngineCreation();
if (!engine) throw 'engine should not be null.';
startRenderLoop(engine, canvas);
window.scene = createScene();};
initFunction().then(() => {sceneToRender = scene                    
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});