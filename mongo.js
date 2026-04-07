const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb://luislopez2m1w_db_user:${password}@ac-snu8pet-shard-00-00.k5xd1ck.mongodb.net:27017,ac-snu8pet-shard-00-01.k5xd1ck.mongodb.net:27017,ac-snu8pet-shard-00-02.k5xd1ck.mongodb.net:27017/phonebookApp?ssl=true&replicaSet=atlas-jnnq9l-shard-0&authSource=admin&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
})

if (process.argv.length === 3) {
  Person.find({}).then(result => {
  console.log('phonebook:')
  result.forEach(person => {
    console.log(person.name, person.number)
  })
  mongoose.connection.close()
})
} else {
  person.save().then(result => {
    console.log('person saved!')
    mongoose.connection.close()
  })
}
