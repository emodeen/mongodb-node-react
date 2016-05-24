var restaurantSchema = new mongoose.Schema({
         name: { type: String, trim: true },
         city: { type: String, trim: true },
     },
     { collection: 'restaurant' }
);

exports.addAPIRouter = function(app, mongoose) {
 
    app.get('/*', function(req, res, next) {
        res.contentType('application/json');
        next();
    });
    app.post('/*', function(req, res, next) {
        res.contentType('application/json');
        next();
    });
    app.put('/*', function(req, res, next) {
        res.contentType('application/json');
        next();
    });
    app.delete('/*', function(req, res, next) {
        res.contentType('application/json');
        next();
    });
};

