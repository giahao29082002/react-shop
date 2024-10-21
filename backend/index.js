const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const port = process.env.PORT || 5000;

require('dotenv').config()
console.log(process.env.DB_URL)



app.use(express.json({limit: "50mb"}));
// app.use(express.urlencoded({limit : "25mb"}));
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}))
app.use(cors({
    origin :"http://localhost:5173",
    credentials: true
}))

//image upload
const uploadImage = require('./src/utils/uploadImage')

const authRoutes = require('./src/users/user.route');
const productRoutes = require('./src/products/products.route');
const reviewRoutes = require('./src/reviews/reviews.router');
const orderRoutes=  require('./src/orders/orders.route')
const statsRoutes = require('./src/stats/stats.route')

app.use('/api/auth',authRoutes)
app.use('/api/products', productRoutes)
app.use("/api/reviews", reviewRoutes)
app.use("/api/orders",orderRoutes)
app.use("/api/stats",statsRoutes)
main()
    .then(() => console.log("MongoDB is conected"))
    .catch(err => console.log(err));
//ZPNfjKE9dR3DmGpA
//admin
async function main() {
    await mongoose.connect(process.env.DB_URL);
    app.get('/', (req, res) => {
        res.send('Shop is start now...!')
    })

}

app.post("/uploadImage", (req, res) => {
    uploadImage(req.body.image)
        .then((url) => res.send(url))
        .catch((err) => res.status(500).send(err));
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})