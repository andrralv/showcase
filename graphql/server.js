var express = require("express")
var { graphqlHTTP } = require("express-graphql")
var { buildSchema } = require("graphql")
const sqlite3 = require('sqlite3').verbose()
const migrate = require('../migrate')
const populateImages = require('../unsplash');
const config = require('../config');
var cors = require('cors');

migrate();

const schema = buildSchema(`
  type Destination {
    id: Int
    name: String
    description: String
    image: String
    country: String
  }

  type Query {
    allDestinations: [Destination]
    destinationById(id: Int): Destination
  }
`);

const root = {
  allDestinations: async () => {
    const destinations = await fetchDataFromDatabase();
    const updatedDestinations = await populateImages(destinations, config.unsplashKey);
    saveDestinationsToDatabase(updatedDestinations);
    return destinations;
  },
  destinationById: async ({ id }) => {
    const destination = await fetchDestinationById(id);
    // const updatedDestinations = await populateImages([destination], config.unsplashKey);
    return destination;
  },
};

async function fetchDataFromDatabase() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('mydatabase.db');
    const query = 'SELECT * FROM destinations';

    db.all(query, (err, rows) => {
      db.close();
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

async function fetchDestinationById(id) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('mydatabase.db');
    const query = 'SELECT * FROM destinations WHERE id = ?';

    db.get(query, [id], (err, row) => {
      db.close();
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

async function saveDestinationsToDatabase(destinations) {
  const db = new sqlite3.Database('mydatabase.db');

  // Assuming id is the primary key
  const updateQuery = 'UPDATE destinations SET image = ? WHERE id = ?';

  for (const destination of destinations) {
    await new Promise((resolve, reject) => {
      db.run(updateQuery, [destination.image, destination.id], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  db.close();
}


var app = express();
app.use(cors());

app.use("/graphql",
  graphqlHTTP({
    schema, 
    rootValue: root,
    graphiql: true,
  })
)

app.listen(4000);
console.log("Running a GraphQL API server at localhost:4000/graphql");