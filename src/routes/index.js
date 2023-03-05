import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home', {
        title: 'HOME',
       // session: req.session,
        //helpers: req.handlebars.helpers,
      // config: req.app.config,
    });
});


router.get('/add', (req, res) => {
    const data = {
        "name": "John",
        "age": 30,
        "cars": [
            { "name": "Ford", "models": ["Fiesta", "Focus", "Mustang"] },
            { "name": "BMW", "models": ["320", "X3", "X5"] },
            { "name": "Fiat", "models": ["500", "Panda"] }
        ]
    };
    res.render('add', {
        title: 'TEST',
        data: data,
        helpers: req.handlebars.helpers,
     }); 
});


export default router;