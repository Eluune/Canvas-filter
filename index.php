<!DOCTYPE html>
<html lang="fr" dir="ltr">
    <head>
        <!-- meta -->
        <meta charset="utf-8">
        <meta name="author" content="Aloïs Petit">
        <title>Canvas Js</title>

        <!-- external ressources -->
        <link rel="stylesheet" href="https://use.typekit.net/fsx3yvj.css">

        <!-- styles -->
        <link rel="stylesheet" href="css/style.css">
    </head>

    <body>

        <header>

            <h1>Modifier mon image</h1>

        </header>

        <main>

            <canvas id="canvas"></canvas>

            <div class="panel">

                <p class="label"> Sélectionner une image </p>
                <div class="input">
                    <input id="import" type="file" name="fileImport">
                    <p class="button-round"></p>
                </div>

                <div class="filtreList">

                    <div id="text" class="filtreItem">
                        Insérer du text
                        <input id="inputText" type="text" placeholder="Insérer du text">
                        <input id="inputTextColor" type="color">
                        axe horizontal<input id="inputTextPosX" type="range" min="0" max="100" step="1" value="5">
                        axe vertical<input id="inputTextPosY" type="range" min="0" max="100" step="1" value="10">
                    </div>

                    <div id="blur" class="filtreItem">
                        <p> Blur </p>
                        <input id="sliderBlur" type="range" min="0" max="20" step="1" value="0"/>
                    </div>

                    <div id="brightness" class="filtreItem">
                        <p> Brightness </p>
                        <input id="sliderBrightness" type="range" min="0" max="1" step="0.01" value="1"/>
                    </div>

                    <div id="contrast" class="filtreItem">
                        <p> Contrast </p>
                        <input id="sliderContrast" type="range" min="0" max="1" step="0.01" value="1"/>
                    </div>

                    <div id="grayscale" class="filtreItem">
                        <p> Grayscale </p>
                        <input id="sliderGrayscale" type="range" min="0" max="1" step="0.01" value="0"/>
                    </div>

                    <div id="invert" class="filtreItem">
                        <p> Invert </p>
                        <input id="sliderInvert" type="range" min="0" max="1" step="0.01" value="0"/>
                    </div>

                    <div id="opacity" class="filtreItem">
                        <p> Opacity </p>
                        <input id="sliderOpacity" type="range" min="0" max="1" step="0.01" value="1"/>
                    </div>

                    <div id="saturate" class="filtreItem">
                        <p> Saturate </p>
                        <input id="sliderSaturate" type="range" min="0" max="1" step="0.01" value="1"/>
                    </div>

                    <div id="sepia" class="filtreItem">
                        <p> Sepia </p>
                        <input id="sliderSepia" type="range" min="0" max="1" step="0.01" value="0"/>
                    </div>

                    <div id="huerotate" class="filtreItem">
                        <p> Hue-Rotate </p>
                        <input id="sliderHuerotate" type="range" min="0" max="359" step="1" value="0"/>
                    </div>

                    <div id="flip" class="filtreItem">
                        Flip
                        <input id="checkFlip" type="checkbox">
                    </div>

                    <div id="vignette" class="filtreItem">
                        Vignette
                        <input id="checkVignette" type="checkbox">
                    </div>

                </div>

                <a id="export" class="button" href="##">Exporter</p>
            </div>

        </main>

        <!-- scripts -->
        <script src="js/script.js"></script>
    </body>
</html>
