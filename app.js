const dns = require("dns/promises");

// Forzar servidores DNS: Google y Cloudflare
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://grupo-07:grupo-07@cluster0.blryo.mongodb.net/NodeMod3Cohorte5')
.then(() => console.log('Conexión exitosa a MongoDB'))
.catch((error) => console.log('Error al conectar a MongoDB', error));

const superheroSchema = new mongoose.Schema({
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
}, {collection: 'Grupo-07'});

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

async function updateSuperHero(nombreSuperHeroe) {
    const result = await SuperHeroe.updateOne(
        {nombreSuperHeroe: nombreSuperHeroe},
        {$set: { edad: 26} }
    );
    console.log('Resultado de la actualización:', result);
}

updateSuperHero('Spiderman');

async function deleteSuperHero(nombreSuperHeroe) {
    const result = await SuperHeroe.deleteOne({nombreSuperHeroe: nombreSuperHeroe});
    console.log('Superhéroe eliminado:', result);
}

deleteSuperHero('Spiderman');

async function findSuperHeroes() {
    const heroes = await SuperHeroe.find({planetaOrigen: 'Tierra'});
    console.log('Superhéroes encontrados:', heroes);
}

findSuperHeroes(); 