'use strict'
const express=require('express');
const bodyParser=require('body-parser');
const Sequelize=require('sequelize');
const sequelize=new Sequelize('moviesdb','mrnobody22','');

let app=express()
app.use(express.static(__dirname+'/app'))
app.use(bodyParser.json())

let Genre=sequelize.define('genre',{
    name:{
        allowNull:false,
        type:Sequelize.STRING
    },
    description:{
        allowNull:false,
        type:Sequelize.STRING
    }
})

let Movie=sequelize.define('movie',{
    mTitle:{
        allowNull:false,
        type:Sequelize.STRING
    },
    mDuration:{
        allowNull:false,
        type:Sequelize.STRING
    },
    mYear:{
        allowNull:false,
        type:Sequelize.STRING
    },
    mDirector:{
        allowNull:false,
        type:Sequelize.STRING
    },
    mURL:{
        allowNull:false,
        type:Sequelize.STRING
    },
    mWatched:{
        allowNull:false,
        type:Sequelize.STRING
    }
})

Genre.hasMany(Movie,{
    foreignKey:'genreId'
})

Movie.belongsTo(Genre,{
    foreignKey:'genreId'
})

app.get('/create',(req,res)=>{
    sequelize
        .sync({
            force:true
        })
        .then(()=>{
            res.status(201).send('creat')
        })
        .catch((error)=>{
            console.warn(error)
            res.status(500).send('eroare')
        })
})

app.get('/genres',(req,res)=>{
    Genre
    .findAll({
        attributes:['id','name','description']
    })
    .then((genres)=>{
        res.status(200).send(genres)
    })
    .catch((error)=>{
        console.warn(error)
        res.status(500).send('eroare')
    })
})
app.post('/genres',(req,res)=>{
    Genre
        .create(req.body)
        .then(()=>{
            res.status(201).send('creat')
        })
        .catch((error)=>{
            console.warn(error)
            res.status(500).send('eroare')
        })
})

app.get('/genres/:id',(req,res)=>{
    Genre
        .find({
            attributs:['id','name','description'],
            where:{
                id:req.params.id
            }
        })
        .then((genre)=>{
            res.status(200).send(genre)
        })
        .catch((error)=>{
            console.warn(error)
            res.status(500).send('eroare')
        })
})
app.delete('/genres/:id',(req,res)=>{
    Genre
        .find({
            where:{
                id:req.params.id
            }
        })
        .then((genre)=>{
            return genre.destroy()
        })
        .then(()=>{
            res.status(201).send('sters')
        })
        .catch((error)=>{
            console.warn(error)
            res.status(500).send('eroare')
        })
})
app.put('/genres/:id',(req,res)=>{
    Genre
        .find({
            where:{
                id:req.params.id
            }
        })
        .then((genre)=>{
            return genre.updateAttributes(req.body)
        })
        .then(()=>{
            res.status(201).send('modificat')
        })
        .catch((error)=>{
            console.warn(error)
            res.status(500).send('eroare')
        })
})
app.get('/genres/:id/movies',(req,res)=>{
    Genre
        .find({
            where:{
                id:req.params.id
            },
            include:[Movie]
        })
        .then((genre)=>{
            return genre.getMovies()
        })
        .then((movies)=>{
            res.status(200).send(movies)
        })
        .catch((error)=>{
            console.warn(error)
            res.status(500).send('eroare')
        })
})
app.get('/genres/:id/movies/:mId',(req,res)=>{
    Movie
        .find({
            attributes:['id','mTitle','mDuration','mYear','mDirector','mURL','mWatched'],
            where:{
                id:req.params.id
            }
        })
        .then((movie)=>{
            res.status(200).send(movie)
        })
        .catch((error)=>{
            console.warn(error)
            res.status(500).send('eroare')
        })
})
app.post('/genres/:id/movies',(req,res)=>{
    Genre
        .find({
            where:{
                id:req.params.id
            }
        })
        .then((genre)=>{
            let movie=req.body
            movie.genreId=genre.id
            return Movie.create(movie)
        })
        .then(()=>{
            res.status(201).send('creat')
        })
        .catch((error)=>{
            console.warn(error)
            res.status(500).send('eroare')
        })
})

app.put('/genres/:id/movies/:mId',(req,res)=>{
    Movie
        .find({
            where:{
                id:req.params.mId
            }
        })
        .then((movie)=>{
            movie.mTitle=req.body.mTitle
            movie.mDuration=req.body.mDuration
            movie.mYear=req.body.mYear
            movie.mDirector=req.body.mDirector
            movie.mURL=req.body.mURL
            movie.mWatched=req.body.mWatched
            return movie.save()
        })
        .then(()=>{
            res.status(201).send('modificat')
        })
        .catch((error)=>{
            console.warn(error)
            res.status(500).send('eroare')
        })
})

app.delete('/genres/:id/movies/:mId',(req,res)=>{
    Movie
        .find({
            where:{
                id:req.params.mId
            }
        })
        .then((movie)=>{
            return movie.destroy()
        })
        .then(()=>{
            res.status(201).send('sters')
        })
        .catch((error)=>{
            console.warn(error)
            res.status(500).send('eroare')
        })
})
app.listen(8080)