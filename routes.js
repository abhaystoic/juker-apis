// expose the routes to our app with module.exports
module.exports = function(app, uploadPath) {


    //Configurations
    app.post('/upload', function(req, res) {
        if (!req.files){
            return res.status(400).send('No files were uploaded.');
        }
         
        // The name of the input field (i.e. "musicFiles") is used to retrieve the uploaded file
        console.log('files===', req.files);
        let musicFiles = req.files.musicFiles;
     
        // Use the mv() method to place the file somewhere on your server 
        musicFiles.mv(uploadPath, function(err) {
            if (err){
              return res.status(500).send(err);
            }
         
            res.send('File uploaded!');
        });
    });

    app.get('/upload', function(req, res) {
        console.log('Bad request. Try POST.');
        console.log("PWD==", __dirname);
        res.send('Bad request. Try POST.');
    });

    app.get('/app/app.js', function(req, res) {
        res.sendFile("app.js", {"root": __dirname});
    });

    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendFile("index.html", {"root": __dirname});
    });

};