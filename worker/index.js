const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000, // retry to connect once per 1000 mini sec when down
});
const sub = redisClient.duplicate();

function fib(index) {
  if (index < 2) return 1;
  // TODO: we can also check from redis cache, see if index, index-1 or index-2 can be found
  // that way will be more efficient
  return fib(index - 1) + fib(index - 2);
}

sub.on('message', (channel, message) => {
  redisClient.hset('values', message, fib(parseInt(message)));
});
sub.subscribe('insert');
