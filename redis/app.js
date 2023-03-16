const redis = require('redis');

const client = redis.createClient({ host: '192.168.1.124', port: 6379 });

client.on('error', (err) => {
  console.error(err);
});

client.set('key', 'value', (err, reply) => {
  if (err) {
    console.error(err);
  } else {
    console.log(reply);
  }
});

client.get('key', (err, reply) => {
  if (err) {
    console.error(err);
  } else {
    console.log(reply);
  }
});
