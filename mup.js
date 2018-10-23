module.exports = {
  servers: {
    one: {
      "host": "128.199.101.243",
      "username": "root",
      // "password": "password"
      // or pem file (ssh based authentication)
      "pem": "/home/gflores/.ssh/id_rsa"
    }
  },

  meteor: {
    name: 'groovecare',
    path: '.',

    docker: {
      image: 'abernix/meteord:base', // use this image if using Meteor 1.4+
      args:[ // lets you add/overwrite any parameter on the docker run command (optional)
      ]
    },

    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true
    },
    env: {
      ROOT_URL: 'http://www.groovecare.com',
      MONGO_URL: 'mongodb://localhost/meteor'
    },
    deployCheckWaitTime: 60
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {}
    }
  }
};
