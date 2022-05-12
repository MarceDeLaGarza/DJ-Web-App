var imdragons="";
var brumars="";
var maroon5="";
var daftp="";
izqMunX = 0;
izqMunY = 0;
derMunX = 0;
derMunY = 0;
puntIzqMun = 0;
puntDerMun = 0;//Se agrega en clase 130

function preload(){
    imdragons = loadSound("believer.mp3");
    brumars = loadSound("uptown.mp3");
    maroon5 = loadSound("sugar.mp3");
    daftp = loadSound("instant.mp3");
}
function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video= createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('PoseNet se ha inicializado');
}
function draw(){
    image(video, 0, 0, 600, 500);
    
    if(puntDerMun >0.2)//OJO: Este condicional se agrega al último, despúes de crear la variable punDerMun
    {    
        fill("#3A86FF");  
        stroke("#3A86FF"); 
        circle(derMunX, derMunY, 20);
        if(derMunY >0 && derMunY <=100){
            document.getElementById("velocidad").innerHTML = "Velocidad = 0.5x";
            imdragons.rate(0.5);
            maroon5.rate(0.5);
            brumars.rate(0.5);
            daftp.rate(0.5);
        }
        else if(derMunY >100 && derMunY <=200){
            document.getElementById("velocidad").innerHTML = "Velocidad = 1x";
            imdragons.rate(1);
            maroon5.rate(1);
            brumars.rate(1);
            daftp.rate(1);
        }
        else if(derMunY >200 && derMunY <=300){
            document.getElementById("velocidad").innerHTML = "Velocidad = 1.5x";
            imdragons.rate(1.5);
            maroon5.rate(1.5);
            brumars.rate(1.5);
            daftp.rate(1.5);
        }
        else if(derMunY >300 && derMunY <=400){
            document.getElementById("velocidad").innerHTML = "Velocidad = 2x";
            imdragons.rate(2);
            maroon5.rate(2);
            brumars.rate(2);
            daftp.rate(2);
        }
        else if(derMunY >400 && derMunY <=500){
            document.getElementById("velocidad").innerHTML = "Velocidad = 2.5x";
            imdragons.rate(2.5);
            maroon5.rate(2.5);
            brumars.rate(2.5);
            daftp.rate(2.5);
        }
    }

//OJO: Si se quiere agregar un círculo de color diferente a cada muñeca, agregar la función fill y stroke dentro del condicional
    if(puntIzqMun > 0.2)
    {
        fill("#FB5607");  
        stroke("#FB5607"); 
        circle(izqMunX, izqMunY, 20);
        numIzqMunY=Number(izqMunY);
        sin_decimales = floor(numIzqMunY);
        volumen = sin_decimales/500;
        document.getElementById("volumen").innerHTML= "Volumen = " + volumen;
        imdragons.setVolume(volumen);
        maroon5.setVolume(volumen);
        brumars.setVolume(volumen);
        daftp.setVolume(volumen);
    }
}

function play(){
    var cancion = document.getElementById("cancion").value;
    if(cancion == "imdragons"){
       brumars.stop();
        maroon5.stop();
        daftp.stop();
        imdragons.setVolume(1);
        imdragons.rate(1);
        imdragons.play();
    }
    if(cancion == "brumars"){
        imdragons.stop();
        maroon5.stop();
        daftp.stop();
        brumars.setVolume(1);
        brumars.rate(1);
        brumars.play();
    }
    if(cancion == "maroon5"){
        imdragons.stop();
        brumars.stop();
        daftp.stop();
        maroon5.setVolume(1);
        maroon5.rate(1);
        maroon5.play();
    }
    if(cancion == "daftp"){
        imdragons.stop();
        brumars.stop();
        maroon5.stop();
        daftp.setVolume(1);
        daftp.rate(1);
        daftp.play();
    }
}
function pause(){
    imdragons.pause();
    daftp.pause();
    maroon5.pause();
    brumars.pause();
}
function stop(){
    imdragons.stop();
    daftp.stop();
    maroon5.stop();
    brumars.stop();
}
function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        puntDerMun = results[0].pose.keypoints[10].score;//Se agrega en la clase 130
        puntIzqMun = results[0].pose.keypoints[9].score;

        console.log("Puntuación muñeca derecha: " + puntDerMun + "Puntuación muñeca izquierda: " + puntIzqMun);//Se agrega en la clase 130 la impresión de los datos de la muñeca derecha

        izqMunX = results[0].pose.leftWrist.x;
        izqMunY = results[0].pose.leftWrist.y;
        console.log("Posición X de muñeca izquierda: " + izqMunX + ", posición Y de muñeca izquierda: " + izqMunY);

        derMunX = results[0].pose.rightWrist.x;
        derMunY = results[0].pose.rightWrist.y;
        console.log("Posición X de muñeca derecha: " + derMunX + ", posición Y de muñeca derecha: " + derMunY);
    }
}