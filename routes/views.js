const { Router } = require("express");

const router = Router();

router.get('/', (req, res) => {
    res.render('home', {
        titulo: 'Modelo Node.js'
    });
});

module.exports = router;