import {Redis} from 'ioredis';

export const connectRedis = ()=>{

  const redis = new Redis(process.env.UPSTASH_REDIS_URL, {
  tls: {}, 
});
    
    redis.on('connect',()=>{
        console.log('redis connected');
        
    })
    
    redis.on('error', console.error);
    return redis;
}