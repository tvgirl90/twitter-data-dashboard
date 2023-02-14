/* eslint-disable node/no-process-env */


export default {
  NodeEnv: (process.env.NODE_ENV ?? ''),
  Port: (process.env.PORT ?? 3001),
  DatabaseUsername: process.env.DB_USERNAME,
  DatabasePassword: process.env.DB_PASSWORD,
  DatabaseName: process.env.DB_NAME,
  DatabaseCluster: process.env.DB_CLUSTER,
  DatabaseCollectionName: process.env.DB_COLLECTION_NAME,
} as const;
