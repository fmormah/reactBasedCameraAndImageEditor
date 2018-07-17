(function () {
    //////////////// Profile Create Stage ///////
    app.ProfileCreateStage = React.createClass({
        render: function() {
        return (
            <div className="console">
                <div className="profile-frame example-bg"></div>
                <div className="inout-holder">
                    <input type="text" id="user-name" placeholder="Your Name"/>
                    <label htmlFor="imageLoader">
                        <span id="js-cta" className="uph btn"> Upload Photo </span>
                    </label>
                    <input type="file" id="imageLoader" name="imageLoader" />
                </div>
            </div>
        );
        }
    });
    app.profileCreateInit = function(){
        ReactDOM.render(<app.ProfileCreateStage />,$('#main')[0]);
        app.adjustConsole();
        app.grabImage();

        if(app.userName !== void(0)){
            $('#user-name').val(app.userName);
        }

        $('.rotate-device').css('visibility','hidden');
    }

    //////////////// Create Pic ////////////////
    app.PicCreateStage = React.createClass({
    render: function() {

        return (
            <div className="console">
                <img id="instruct" className="gesture-guide" src="img/instruct.jpg" />

               

                <canvas id="imageCanvas" className="profile-frame center"></canvas>
                <div className="inout-holder full">
                    <label htmlFor="imageLoader">
                        <span id="js-cta" className="uph btn a">Another Photo</span>
                    </label>
                    <input type="file" id="imageLoader" name="imageLoader" />

                     <div>
                         <div className="slider-holder">
                            <div className="slide-label">Rotate</div>
                            <div className="rotate-slide slider"></div>
                        </div>
                        <div className="slider-holder">
                            <div className="slide-label">Scale</div>
                            <div className="size-slide slider"></div>
                        </div>
                    </div>

                    <button className="half bck">Back</button>
                    <button className="half ok">Ok</button>
                </div>
            </div>
        );
        }
    });
    app.picCreate = function(){
        ReactDOM.render(<app.PicCreateStage />,$('#main')[0]);
        app.adjustConsole();

        $('.rotate-device').css('visibility','visible');

        app.grabImage();
        app.placeImage();

        $('.bck').click(function(){
            app.profileCreateInit();
            app.clearCanvas();
        });

        $('.ok').click(function(e){
             app.saveImg(e);
             app.clearCanvas();

        });
    }
    
    //////////////// Confirm Stage //////////////
    app.ConfirmationStage = React.createClass({
    render: function() {

        var divStyle = {
          backgroundImage: 'url(' + app.imgData + ')'
        };

        return (
            <div className="console">
                <div style={divStyle} className="profile-frame center"></div>


                <div className="inout-holder full c">
                    <button className="half bck">re-align</button>
                    <button className="half">Use Photo</button>
                </div>


            </div>
        );
    }
    });
    app.confirmStage = function(){
        ReactDOM.render(<app.ConfirmationStage />,$('#main')[0]);
        app.adjustConsole();

        $('.bck').click(function(){
            app.picCreate();
        });
    }
})();