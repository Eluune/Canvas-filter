function loadCanvasWithInputFile(){
    // canvas
    var canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth - (3 * window.innerWidth / 10);
    canvas.height = window.innerHeight - 240;
    var ctx = canvas.getContext("2d");

    // Variables
        var draw = false; // si true : empêche la réécriture de l'image (car déjà effectué dans un filtre)
        // Text
        var text = document.getElementById('inputText');
        var textcolor = document.getElementById('inputTextColor');
        var textposx = document.getElementById('inputTextPosX');
        var textposy = document.getElementById('inputTextPosY');

        // vignettes
        var vignette = document.getElementById('checkVignette');
        var vignetted = false;

        // Flip
        var flip = document.getElementById('flip');
        var flipped = false;

    // chargement de l'image
    var fileinput = document.getElementById('import');
    var img = new Image();
    fileinput.onchange = function(evt)
    {
        var files = evt.target.files;
        var file = files[0];
        if(file.type.match('image.*'))
        {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(evt)
            {
                if( evt.target.readyState == FileReader.DONE)
                {
                    img.src = evt.target.result;
                    img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                }
            }
        }
        else
        {
            alert("Ce n'est pas une image");
        }
    };

    // export de l'image
    var exporter = document.getElementById('export');
    exporter.onclick = function()
    {
        var image = canvas.toDataURL();
        var aLink = document.getElementById('export');
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("click");
        aLink.download = 'image.jpg';
        aLink.href = image;
    }

    // filtres
    function filtresToString(filtre)
    {
        var string =
            filtre.blur + ' ' +
            filtre.contrast + ' ' +
            filtre.grayscale + ' ' +
            filtre.invert + ' ' +
            filtre.saturate + ' ' +
            filtre.sepia + ' ' +
            filtre.opacity + ' ' +
            filtre.brightness + ' ' +
            filtre.huerotate;
        return string;
    }

    // Initialisation des filtres
    var filtre = {
        blur: '',
        brightness: '',
        contrast: '',
        grayscale: '',
        invert: '',
        opacity: '',
        saturate: '',
        sepia: '',
        huerotate: '',
    };

    var filter = document.querySelectorAll('.filtreItem input');
    filter.forEach
    (
        element => element.addEventListener('input', function()
        {
            draw = false;
            switch(this.id)
            {
                case 'sliderBlur':
                    filtre.blur = 'blur( ' + this.value + 'px)';
                break;

                case 'sliderBrightness':
                    filtre.brightness = 'brightness( ' + this.value + ')';
                break;

                case 'sliderContrast':
                    filtre.contrast = 'contrast( ' + this.value + ')';
                break;

                case 'sliderGrayscale':
                    filtre.grayscale = 'grayscale( ' + this.value + ')';
                break;

                case 'sliderInvert':
                    filtre.invert = 'invert( ' + this.value + ')';
                break;

                case 'sliderOpacity':
                    filtre.opacity = 'opacity( ' + this.value + ')';
                break;

                case 'sliderSaturate':
                    filtre.saturate = 'saturate( ' + this.value + ')';
                break;

                case 'sliderSepia':
                    filtre.sepia = 'sepia( ' + this.value + ')';
                break;

                case 'sliderHuerotate':
                    filtre.huerotate = "hue-rotate( " + this.value + "deg)";
                break;

                case 'checkFlip':
                    if(flipped == false)
                    {
                        var scaleH = -1,
                            scaleV = 1,
                            posX = canvas.width * -1,
                            posY = canvas.height * 0;
                        flipped = true;
                        draw = true;
                    }
                    else
                    {
                        var scaleH = -1,
                            scaleV = 1,
                            posX = canvas.width * 0,
                            posY = canvas.height * 0;
                        flipped = false;
                    }

                    ctx.save();
                    ctx.scale(scaleH, scaleV);
                    ctx.drawImage(img, posX, posY, canvas.width, canvas.height);
                break;

                case 'checkVignette':
                    if(vignetted == false)
                    {
                        grd = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 0, canvas.width/2, canvas.height/2, Math.sqrt(canvas.width * canvas.height));
                        grd.addColorStop(0.0, 'rgba(0, 0, 0, 0.000)');
                        grd.addColorStop(0.8, 'rgba(0, 0, 0, 1.000)');
                        grd.addColorStop(1.0, 'rgba(0, 0, 0, 1.000)');
                        ctx.fillStyle = grd;
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                        draw = true;
                        vignetted = true;
                    }
                    else
                    {
                        vignetted = false;
                    }
                break;
            }

            if(!draw)
            {
                ctx.filter = filtresToString(filtre);
                ctx.fillStyle = "#E7F0EF";
                ctx.rect(0, 0, canvas.width, canvas.height);
                console.log(ctx.filter);
                ctx.fill();
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            }

            // Vignette
            if(vignetted)
            {
                grd = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 0, canvas.width/2, canvas.height/2, Math.sqrt(canvas.width * canvas.height));
                grd.addColorStop(0.0, 'rgba(0, 0, 0, 0.000)');
                grd.addColorStop(0.8, 'rgba(0, 0, 0, 1.000)');
                grd.addColorStop(1.0, 'rgba(0, 0, 0, 1.000)');
                ctx.fillStyle = grd;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            if(flipped)
            {
                var scaleH = -1,
                    scaleV = 1,
                    posX = canvas.width * -1,
                    posY = canvas.height * 0;
                flipped = true;
                draw = true;

                ctx.save();
                ctx.scale(scaleH, scaleV);
                ctx.drawImage(img, posX, posY, canvas.width, canvas.height);
            }

            // Text
            ctx.fillStyle = textcolor.value;
            ctx.font = "30px Arial";
            ctx.fillText(text.value, (canvas.width * textposx.value) / 100, (canvas.height * textposy.value) / 100);
        })
    );

    // Insertion texte
    text.oninput = function ()
    {
        ctx.fillStyle = "#E7F0EF";
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fill();
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.fillStyle = textcolor.value;
        ctx.font = "30px Arial";
        ctx.fillText(this.value, (canvas.width * textposx.value) / 100, (canvas.height * textposy.value) / 100);
    }
}

loadCanvasWithInputFile();
