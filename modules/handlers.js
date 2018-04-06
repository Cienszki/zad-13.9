var fs = require('fs');
var formidable = require('formidable');
var newName = null;
exports.upload = function (request, response) {
    console.log("Rozpoczynam obsługę żądania upload.");
    var form = new formidable.IncomingForm();
    form.parse(request, function (error, fields, files) {
        fs.renameSync(files.upload.path, files.upload.name);
        newName = files.upload.name;
        response.writeHead(200, {
            "Content-Type": "text/html"
        });
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end();
    });
};
exports.css = function (request, response) {
    fs.readFile('templates/css/style.css', function (err, file) {
        response.writeHead(200, {
            "Content-Type": "text/plain;"
        });
        response.write(file);
        response.end();
    });
};

exports.welcome = function (request, response) {
    console.log("Rozpoczynam obsługę żądania welcome.");
    fs.readFile('templates/start.html', function (err, html) {
        // czemu html? mozna tam wpisac cokolwiek ?
        // sciezke do pliku podajemy wychodzac od pliku ktoey wykonuje to polecenie (index.js) a nie od tego?
        response.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8"
        });
        // kiedy text/html a kiedy co innego ?
        response.write(html);
        response.end();
    });

};

exports.error = function (request, response) {
    console.log("Nie wiem co robić.");
    response.write("404 :(");
    response.end();
};

exports.show = function (request, response) {
    fs.readFile(newName, function (error, file) {
        // czemu error a nie err jak wczesniej
        response.writeHead(200, {
            "Content-Type": "text/png;"
        });
        response.write(file);
        // skad tu "binary"
        response.end();
    });
};