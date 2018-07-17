(function () {
    //////////////// Profile Create Stage ///////
    app.ProfileCreateStage = React.createClass({
        render: function() {
          return (
              <div className="console">
                  <img className ="we-are" src="img/logo.png" />
                  <img className ="resolve-ready" src="img/sub-copy.png" />
                  <img className ="voda-1" src="img/voda-1.png" />
                  <div className="profile-frame example-bg"></div>
                  <div className="inout-holder">
                      <img className ="resolve-ready2" src="img/sub-copy.png" />
                      <p className="intro-para">You are <span className="voda-red">The Red Line.</span><br/>Upload your photo and show you’re <span className="voda-red">Ready and Resolved.</span> </p>


                      <form id="uploadForm" action="https://clippingmagic.com/api/v1/images?csrfToken=1530615203196-6642c400bcb76e253b3863fc95c3be6611b04b7d" method="POST" encType="multipart/form-data" class="form-inline">
                        <input type="text" id="user-name" placeholder="Enter First Name"/>
                        <label htmlFor="imageLoader">
                            <span id="js-cta" className="uph btn arra-1"> ADD PHOTO </span>
                        </label>


                        <input type="file" accept=".png, .jpg, .jpeg" id="imageLoader" name="image" />
                      </form>


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
        app.userName = void(0);
        $('.rotate-device').css('visibility','hidden');
        $('.voda-1').addClass('active');
    }

    //////////////// Create Pic ////////////////
    app.PicCreateStage = React.createClass({
    render: function() {

        return (
            <div className="console">
                <img id="instruct" className="gesture-guide" src="img/instruct.jpg" />
                <img className ="voda-1 active" src="img/voda-1.png" />
                <canvas id="imageCanvas" className="profile-frame"></canvas>
                <div className="controls-console">
                    {/*<label htmlFor="imageLoader">
                        <span id="js-cta" className="uph btn a">Another Photo</span>
                    </label>
                    <input type="file" id="imageLoader" name="imageLoader" />*/}
                        <p className="intro-para"> Adjust your photo to fit <span className="voda-red">The Red Line</span> across your eyes. </p>
                     <div>
                         <div className="slider-holder">
                            <div className="slide-label">Rotate</div>
                            <div className="rotate-slide slider"></div>
                        </div>
                        <div className="slider-holder">
                            <div className="slide-label">Zoom</div>
                            <div className="size-slide slider"></div>
                        </div>
                    </div>

                    <button className="arra-1 ok">Ok</button>
                    <button className="arra-2 bck">Back</button>

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
                    {/*<p className="intro-para center drag-me-up">Congratulations! You are now part of <span className="voda-red">The Red Line.</span><br/>Click below to save and share your new photo.</p>*/}
                     <p className="intro-para center drag-me-up">Great shot!<br/>Now remember to save it and upload it as your Yammer profile pic.</p>

                    <a download="red-line" href={app.imgData} style={divStyle} className="profile-frame re-adj move-top"></a>

                    <div className="inout-holder full c">
                        <button className="half bck arra-2 a-right">Re-crop</button>
                        <button className="half ok arra-1 a-left">Save / Share</button>
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

        $('.ok').click(function(){
            //app.picShare();
            $('.profile-frame')[0].click();
        });

        if(app.inMobile === false){
            app.picShare();
        }

    }

    //////////////// Share Pic ////////////////
    app.PicShareStage = React.createClass({
    render: function() {

        var divStyle = {
          backgroundImage: 'url(' + app.imgDownloadUrl + ')'
        };

        return (
            <div className="console thx-con">
                <img id="instruct" className="gesture-guide" src="img/instruct.jpg" />

                <a download="red-line" href={app.imgDownloadUrl} style={divStyle} className="profile-frame re-adj move-top"></a>
                <div className="controls-console">
                    {/*<label htmlFor="imageLoader">
                        <span id="js-cta" className="uph btn a">Another Photo</span>
                    </label>
                    <input type="file" id="imageLoader" name="imageLoader" />*/}
                    {/*<p className="intro-para drag-me-up margin-bottom-73 desktop-only">Congratulations! You are now part of <span className="voda-red">The Red Line.</span><br/>Click below to save and share your new photo.</p>*/}
                     <p className="intro-para center drag-me-up">Great shot!<br/>Now remember to save it and upload it as your Yammer profile pic.</p>
                    <div>
                    <button className="arra-1 ok a-left">Save</button>
                    <button className="arra-2 bck a-right mobile-float-left">Start again</button>
                    </div>

                     {/*<span className="share-label">Share</span>

                   <div className="share-btn-holder">
                        <div className="share-btn yamma"></div>
                        <div className="share-btn twter"></div>
                        <div className="share-btn fb"></div>
                    </div>*/}

                </div>

            </div>
        );
        }
    });
    app.picShare = function(){
        ReactDOM.render(<app.PicShareStage />,$('#main')[0]);
        app.adjustConsole();

       //onClick={app.postToYammer.bind(this,app.imgData)}

        $('.rotate-device').css('visibility','visible');

        $('.bck').click(function(){
            app.profileCreateInit();
        });

        $('.ok').click(function(e){
           $('.profile-frame')[0].click();
        });

        $('.yamma').click(function(){
            //app.postToYammer(app.imgData);
        });
        $('.yamma').attr('onclick','app.postToYammer(app.imgData)');
    }
})();
