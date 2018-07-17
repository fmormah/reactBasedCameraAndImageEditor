(function () {
    //app scope
    window.app = {};

    //Grab Image from camera or device drive and save its Data URI and UserName
    app.grabImage = function() {
        var imageLoader = $('#imageLoader')[0];

        $('#imageLoader').change(function(e) {
            handleImageFromMedia(e)
        });


        function handleImageFromMedia(e) {
            var reader = new FileReader();
            reader.onload = function(event) {

                console.log(event.target.result);
                if(app.userName === void(0)){
                    app.userName = $('#user-name').val();
                }
                app.capturedImg = event.target.result;
                app.picCreate();

            }

            reader.readAsDataURL(e.target.files[0]);
        }
    }

    //Canvas captured Image
    app.placeImage = function() {

        app.iOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

        app.viewWidth = parseInt($('.profile-frame').css('width'));
        app.viewHeight = parseInt($('.profile-frame').css('height'));
        var canRotate = true;

        if (window.innerWidth < 640) {
            app.inMobile = true;
            canRotate = false;
        }else{
            app.inMobile = false;
        }

        $('.profile-frame')[0].width = app.viewWidth;
        $('.profile-frame')[0].height = app.viewHeight;

        if (app.canvas === void(0)) {
            app.canvas = new fabric.Canvas('imageCanvas', {
                backgroundColor: 'rgb(0,0,0)'
            });
        }


        var img = new Image();
        var scale = 0.45;
        img.onload = function() {

            

            app.imgInstance = new fabric.Image(img, {
                scaleX: scale,
                scaleY: scale,
                left: (app.viewWidth / 2) - ((this.width * scale) / 2),
                top: (app.viewHeight / 2) - ((this.height * scale) / 2),
                hasRotatingPoint: canRotate,
               
                hasBorders: false,
                hasControls: false,
                hasRotatingPoint: false,
                opacity: 0.8
            });

            app.imgInstance.savedScale = scale;

            function correctAngle(e) {
                if (app.iOSDevice === true) {
                    app.imgInstance.setAngle(90);
                } else {
                    app.imgInstance.setAngle(0);
                }
            }

            if (app.iOSDevice === true) {
                app.imgInstance.setAngle(90);
            } else {
                app.imgInstance.setAngle(0);
            }


            app.canvas.on({
                'mouse:down': function(e) {
                    if (e.target) {
                        //e.target.opacity = 0.5;
                        //correctAngle(e);
                        app.canvas.renderAll();
                    }
                    $('#instruct').css('opacity',0);
                },
                'mouse:up': function(e) {
                    if (e.target) {
                        //e.target.opacity = 1;
                        //correctAngle(e);
                        app.canvas.renderAll();
                    }
                    $('#instruct').css('opacity',1);
                },
                'object:moved': function(e) {
                    //e.target.opacity = 0.5;
                    //correctAngle(e);
                },
                'object:modified': function(e) {
                    //e.target.opacity = 1;
                    //correctAngle(e);
                },
                'touch:gesture': function() {

                },
                'touch:drag': function() {

                },
                'touch:orientation': function() {
                    //
                },
                'touch:shake': function() {
                    //
                },
                'touch:longpress': function() {
                    //
                }
            });


            app.placeGuide('img/guide.png');
        }
        console.log('trying for: ', app.capturedImg);
        img.src = app.capturedImg;
    };

    //Print head guide on canvas
    app.placeGuide = function(src) {

        var img = new Image();
        //img.setAttribute('crossOrigin', 'anonymous');
        var scale = 0.7;
        img.onload = function() {
            app.guideImg = new fabric.Image(img, {
                scaleX: scale,
                scaleY: scale,
                left: (app.viewWidth / 2) - ((this.width * scale) / 2),
                top: (app.viewHeight / 2) - ((this.height * scale) / 2) + 40,
                hasBorders: false,
                hasControls: false,
                hasRotatingPoint: false,
                lockMovementX: true,
                lockMovementY: true,
                opacity: 0.7
            });


            app.placeStreak('img/streak.png');
            //canvas.add(imgInstance);


        }
        img.src = src;
    };

    //Place red streak on canvas
    app.placeStreak = function(src) {

        var img = new Image();

        var scale = 0.7;
        img.onload = function() {
            app.streak = new fabric.Image(img, {
                    scaleX: scale,
                    scaleY: scale,
                    left: (app.viewWidth / 2) - ((this.width * scale) / 2),
                    top: (app.viewHeight / 2) - ((app.guideImg.height * scale) / 2) + 40 + (145 * scale),
                    hasBorders: false,
                    hasControls: false,
                    hasRotatingPoint: false,
                    lockMovementX: true,
                    lockMovementY: true
                });
                //console.log(imgInstance);
                //canvas.add(imgInstance);
                //canvas.sendToBack(app.streak);
                //canvas.add(app.streak);
            if(app.inMobile === true && app.iOSDevice === false){
                app.imgInstance.toggle('flipX');
            }

            app.canvas.clear().renderAll();
            app.canvas.sendToBack(app.guideImg);
            app.canvas.add(app.imgInstance);
            app.canvas.add(app.streak);

            app.canvas.setActiveObject(app.imgInstance);

         if(app.inMobile === false){
             app.imgInstance.originX = 'center';
             app.imgInstance.originY = 'center';
             app.imgInstance.left = app.imgInstance.left + ((app.imgInstance.width * app.imgInstance.savedScale )/2);
             app.imgInstance.top = app.imgInstance.top + ((app.imgInstance.height * app.imgInstance.savedScale )/2);

                $('.rotate-slide').slider({
                    min: 0,
                    max: 360,
                    step: 1,
                    value: 0,
                    slide: function( event, ui ) {
                        var activeObject = app.canvas.getActiveObject();
                        if(activeObject) {
                            activeObject.angle = ui.value;
                            activeObject.setCoords();
                            app.canvas.renderAll();
                        }
                    }
                });

                $('.size-slide').slider({
                    min: 0,
                    max: 3,
                    step: 0.01,
                    value: app.imgInstance.savedScale,
                    slide: function( event, ui ) {
                        var activeObject = app.canvas.getActiveObject();
                        if(activeObject) {
                            activeObject.scaleX = ui.value;
                            activeObject.scaleY = ui.value;
                            activeObject.setCoords();
                            app.canvas.renderAll();
                        }
                    }
                });

            }

            //canvas.sendToBack(imgInstance);
        }
        img.src = src;
    }

    //Get Image Data
    app.saveImg = function(e) {

        function saveImage(e) {

            app.imgInstance.opacity = 1;
            app.canvas.remove(app.guideImg);
            app.canvas.bringToFront(app.streak);

            if(app.userName !== ''){
                function capitalizeFirstLetter(string) {
                    return string.charAt(0).toUpperCase() + string.slice(1);
                }

                app.text = new fabric.Text("I am "+ capitalizeFirstLetter(app.userName), { 
                    fontFamily: "Arial", 
                    left: 30,
                    top: (app.viewHeight/4) * 3,
                    fontSize: 24,
                    textAlign: "left",
                    fill: "#ffffff" 
                });

                app.textShadow = new fabric.Text("I am "+ capitalizeFirstLetter(app.userName), { 
                    fontFamily: "Arial", 
                    left: 31,
                    top: ((app.viewHeight/4) * 3) + 1,
                    fontSize: 24,
                    textAlign: "left",
                    fill: "#000000"
                });
                
                app.textStreak = new Image();
                app.textStreak.src = 'img/streak.png';
                var textStreak = new fabric.Image(app.textStreak, {
                    width: app.text.width - 38,
                    height: app.text.height + 3,
                    left: app.text.left + 47,
                    top: app.text.top - 3,
                    hasBorders: false,
                    hasControls: false,
                    hasRotatingPoint: false,
                    lockMovementX: true,
                    lockMovementY: true
                });


                app.canvas.add(textStreak);
                app.canvas.add(app.textShadow);
                app.canvas.add(app.text);
            }

            app.canvas.deactivateAll().renderAll();

            this.href = app.canvas.toDataURL({
                format: 'jpeg',
                quality: 1
            });

            console.log(this.href);
            app.imgData = this.href;
            this.download = 'test.png';
            app.confirmStage();
        }

        function convertCanvasToImage(canvas) {
            var image = new Image();
            image.src = app.canvas.toDataURL("image/png");
            //return image;
            return app.canvas.toDataURL("image/png");
        }

        saveImage(e);
    };

    //clear canvas
    app.clearCanvas = function(){
        app.canvas = void(0);
        app.imgInstance = void(0);
        app.guideImg = void(0);
        app.streak = void(0);
    }

    //Vertical Align Console
    app.adjustConsole = function(){
        var newY = (window.innerHeight / 2) - (parseInt($('.console').css('height'))/2);
        $('.console').css('top',newY);
        $('.console').css('opacity',1);
    };

    //Hide potrait
    $( window ).resize(function() {
        app.adjustConsole();
      if(window.innerHeight < window.innerWidth){
        $('.rotate-device').addClass('active');
      }else{
        $('.rotate-device').removeClass('active');
      }
    });
})();