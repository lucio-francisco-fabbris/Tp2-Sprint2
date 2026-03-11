const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://lufranfa321:lufranfa0610@cursadanodejs.ls9ii.mongodb.net/NodeMod3Cohorte5')
.then(() => console.log('Conexión exitosa a MongoDB'))
.catch(error => console.error('Error al conectar a MongoDB'));

const superheroSchema = new mangoose.Schema({
    nombreSuperHeroe: { type: String, required: true},
    nombreReal: { type: String, required: true},
    edad: { type: Number, min: 0},
    planetaOrigen: { type: String, default: 'Desconocido'},
    debilidad: String,
    poderes: [String],
    aliados: [String],
    enemigos: [String],
    CreatedAt: {type: Date, default: Date.now},
    creador: String
}, {collection: 'Grupo-XX'});

const SuperHeroe = mongoose.model('SuperHeroe', superheroSchema);

async function insertSuperHero() {
    const hero = new SuperHeroe({
        nombreSuperHeroe: 'Spiderman',
        nombreReal: 'Peter Parker',
        edad: 25,
        planetaOrigen: 'Tierra',
        debilidad: 'Radioactividad',
        poderes: ['Trepar paredes', 'Sentido arácnido', 'Fuerza sobrehumana', "Agilidad"],
        aliados: ['Ironman'],
        enemigos: ['Duende Verde'],
        creador: 'Stan Lee'
    });
    await hero.save();
    console.log('Superéroe insertado:', hero);
}

insertSuperHero();

async function updateSuperHero() {
    const result = await SuperHeroe.updateOne(
        {nombreSuperHeroe: nombreSuperHeroe},
        {$set: { edad: 26} }
    );
    console.log('Resultado de la actualización:', result);
}

updateSuperHero('Spiderman');

async function deleteSuperHero() {
    const result = await SuperHeroe.deleteOne({nombreSuperHeroe: nombreSuperHeroe});
    console.log('Superhéroe eliminado:', result);
}

deleteSuperHero('Spiderman');

async function findSuperHeroes() {
    const heroes = await SuperHeroe.find({planetaOrigen: 'Tierra'});
    console.log('Superhéroes encontrados:', heroes);
}

findSuperHeroes();