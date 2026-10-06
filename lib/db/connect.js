import mongoose from "mongoose";

/**
 * One shared connection for the whole app.
 *
 * Next reloads modules on every edit in dev, and a cached promise survives
 * that without leaving a hanging connection behind on each reload.
 */

const FALLBACK_URI = "mongodb://127.0.0.1:27017/kamaldeep";

if (!globalThis.__kamaldeepMongo) {
  globalThis.__kamaldeepMongo = { connection: null, promise: null };
}

const cache = globalThis.__kamaldeepMongo;

export function connectDB() {
  if (cache.connection) return Promise.resolve(cache.connection);

  if (!cache.promise) {
    const uri = process.env.MONGODB_URI || FALLBACK_URI;

    cache.promise = mongoose
      .connect(uri, { serverSelectionTimeoutMS: 8000 })
      .then((m) => {
        cache.connection = m;
        return m;
      })
      .catch((error) => {
        // Let the next request try again instead of caching a dead promise.
        cache.promise = null;
        throw error;
      });
  }

  return cache.promise;
}

/**
 * A page render or an API route that forgets to await `connectDB()` would
 * otherwise sit in Mongoose's buffer until it times out, so the connection is
 * started as soon as this module is loaded. Every controller and model goes
 * through here, so importing anything that touches the database is enough.
 */
connectDB().catch(() => {
  // Swallowed on purpose: the real request that follows gets the error and the
  // API layer turns it into a 500 with a useful message.
});

export function disconnectDB() {
  cache.connection = null;
  cache.promise = null;
  return mongoose.disconnect();
}

export default connectDB;