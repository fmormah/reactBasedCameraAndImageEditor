(function () {
    //app scope
    window.app = {};

     app.iOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

     app.isTouch = function(){
       var el = document.createElement('div');
       el.setAttribute('ontouchstart', 'return;'); // or try "ontouchstart"
       return typeof el.ontouchstart === "function";
    };

    app.textStreak = new Image();
    app.textStreak.src = 'img/nameline.png';

    //Grab Image from camera or device drive and save its Data URI and UserName
    app.grabImage = function() {
        var imageLoader = $('#imageLoader')[0];

        $('#imageLoader').change(function(e) {
            handleImageFromMedia(e)
        });

        if($('#user-name')[0]){
            $('#user-name')[0].onkeypress = function(e){
                if (!e) e = window.event;
                var keyCode = e.keyCode || e.which;
                if (keyCode == '13'){
                  // Enter pressed
                  $('#user-name')[0].blur();
                  $('#js-cta').click();
                  return false;
                }
            }
        }
        


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
                lockMovementY: true,
                lockRotation: true,
                lockScalingX: true,
                lockScalingY: true

            });

         
            
            
            //console.log(imgInstance);
            //canvas.add(imgInstance);
            //canvas.sendToBack(app.streak);
            //canvas.add(app.streak);

            //app.streak.filters.push(app.streakFilter);
            //app.streak.applyFilters(app.canvas.renderAll.bind(app.canvas));
            //app.canvas.applyFilters(app.canvas.renderAll.bind(canvas));

            if(app.inMobile === true && app.iOSDevice === false){
                app.imgInstance.toggle('flipX');
            }
            app.streak.opacity = 0.8;
            app.canvas.clear().renderAll();
            app.canvas.sendToBack(app.guideImg);
            app.canvas.add(app.imgInstance);
            app.canvas.add(app.streak);
            app.canvas.setActiveObject(app.imgInstance);

         if(app.isTouch() === false){
            $('.slider-holder').addClass('hide');
             app.imgInstance.originX = 'center';
             app.imgInstance.originY = 'center';
             app.imgInstance.left = app.imgInstance.left + ((app.imgInstance.width * app.imgInstance.savedScale )/2);
             app.imgInstance.top = app.imgInstance.top + ((app.imgInstance.height * app.imgInstance.savedScale )/2);

                $('.rotate-slide').slider({
                    min: -180,
                    max: 180,
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
            app.streakWidth = 0;

           
            var extraTextMargin = 0;
            var fontWight = (parseInt($('.profile-frame').css('height'))/7);//24;

            if(app.inMobile === false){
                //extraTextMargin = (app.viewHeight/8);
                //fontWight = 48;
            }

            var xAnchor = 30;
            var yAnchor = (app.viewHeight/2) +  (parseInt($('.profile-frame').css('height'))/7)/2;

            var displayText = function(str,x,y,size,getWidth){

                app.text = new fabric.Text(str, { 
                    fontFamily: "vodafone_rgbold", 
                    left: x,
                    top: y,
                    fontSize: size,
                    textAlign: "left",
                    fill: "#ffffff" 
                });

                app.textShadow = new fabric.Text(str, { 
                    fontFamily: "vodafone_rgbold", 
                    left: x+1,
                    top: y + 1,
                    fontSize: size,
                    textAlign: "left",
                    fill: "#000000"
                });

                if(getWidth === true){
                    app.streakWidth = app.text.width;
                    if(app.streakWidth > parseInt($('.profile-frame').css('width'))){

                        fontWight = fontWight/2;

                        app.text.fontSize = app.text.fontSize /2;
                        app.textShadow.fontSize = app.textShadow.fontSize /2;
                        app.streakWidth =  app.streakWidth / 2;
                    }

                    app.text.top = app.text.top + fontWight;
                    app.textShadow.top = app.textShadow.top + fontWight;

                    console.log(app.streakWidth);
                }

                app.canvas.add(app.textShadow);
                app.canvas.add(app.text);

            };

            var displayStreak = function(){
                var textStreak = new fabric.Image(app.textStreak, {
                    width: app.streakWidth + 20,
                    height: fontWight + 8,
                    left: xAnchor - 5,
                    top: (yAnchor + fontWight) - 2,
                    hasBorders: false,
                    hasControls: false,
                    hasRotatingPoint: false,
                    lockMovementX: true,
                    lockMovementY: true,
                });

                app.canvas.sendBackwards(textStreak);
            }

            if(app.userName !== ''){
                function capitalizeFirstLetter(string) {
                    return string.charAt(0).toUpperCase() + string.slice(1);
                }

                

                displayText(capitalizeFirstLetter(app.userName),xAnchor,yAnchor, fontWight, true);
                displayStreak();

                displayText('I am',xAnchor,yAnchor, fontWight);
                
                displayText('Ready. Resolved.',xAnchor,yAnchor + (fontWight * 2), fontWight/2);
                


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
        $('#main').css('top',newY);
        $('.console').css('opacity',1);
    };

    //post to yammer
    app.postToYammer = function(imgData){
        
        yam.platform.login(function (response) { //prompt user to login and authorize your app, as necessary
                if (response.authResponse) {
                  console.log("logged in");

                var msg = "I am The Red Line. Ready. Resolved.";



                var m_data = new FormData();

                m_data.append('body', msg);
//              m_data.append('group_id', 8611015); // CSG group
                m_data.append('group_id', 8655741); // Vodafonegroup
                var dataURLToBlob = function(dataURL) {
                    var BASE64_MARKER = ';base64,';

                    var parts = dataURL.split(BASE64_MARKER);
                    var contentType = 'image/jpeg';// = parts[0].split(':')[1];
                    var raw = window.atob(parts[1]);
                    var rawLength = raw.length;

                    var uInt8Array = new Uint8Array(rawLength);

                    for (var i = 0; i < rawLength; ++i) {
                      uInt8Array[i] = raw.charCodeAt(i);
                    }

                    return new Blob([uInt8Array], {type: contentType});
                }

                var blob = dataURLToBlob(imgData);

                m_data.append( "attachment1", blob, "redstripe.jpg");
                

                yam.platform.request({

                    url: "messages.json",     
                    contentType: "multipart/form-data",
                    data: m_data,
                    processData: false,
                    contentType: false,
                    method: 'Post',
                    dataType: 'json',
                    success: function (user) { 
                        app.alert("You've shared your photo");
                    },
                    error: function (user) {console.log(user);
                        alert("There was an error with the request.");
                    }
                });
                }
              });
    }


    //yammer logout
    app.logOutYammer = function(){
        yam.platform.logout(function (response) {
          console.log("user was logged out");
        });
    }

    //Alert Box
    app.alert = function(msg){
        $('body').append('<div class="dark-field"> <div class="msg-box"> <p>'+msg+'</p> <span class="alert-box-x">X</span></div> </div>');
        $('.alert-box-x').click(function(){
            $('.dark-field').remove();
        });
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