const userRoutes = require('../routes/userRoutes');

app.user('/api/suff', stuffRoutes);
app.use('/api/auth', userRoutes);

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 20).then(
        (hash) => {
            const user = new User  ({
                email: req.body.email,
                password: hash
            });
            user.save().then(
                () => {
                    res.status(201).json({
                        message: 'user added'
                    });
                }
            ).catch(
                (error) => {
                    res.status(500).json({
                        error:error          
                    })
                }
            );
        }
    );
};

exports.login = (req, res, next) => {
    
}
