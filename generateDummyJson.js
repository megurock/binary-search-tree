const fs = require('fs')
const { faker } = require('@faker-js/faker')

const data = []
for (let i = 0; i < 10 ** 5; i++) {
  data.push({
    id: faker.string.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthDate: faker.date.birthdate(),
    registeredAt: faker.date.past()
  })
}

fs.writeFileSync('public/js/data/dummy.json', JSON.stringify(data, null, 2))
console.log(`Created ${data.length} records`)
