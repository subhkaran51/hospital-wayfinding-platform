// campus-navigation/campus-navigation/src/utils/logger.js

const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
};

let currentLevel =
  process.env.NODE_ENV === 'production' ? LOG_LEVELS.WARN : LOG_LEVELS.DEBUG;

export const logger = {
  setLevel: (level) => {
    currentLevel = LOG_LEVELS[level] || LOG_LEVELS.INFO;
  },

  debug: (message, data = {}) => {
    if (currentLevel <= LOG_LEVELS.DEBUG) {
      console.debug(`[DEBUG] ${message}`, data);
    }
  },

  info: (message, data = {}) => {
    if (currentLevel <= LOG_LEVELS.INFO) {
      console.info(`[INFO] ${message}`, data);
    }
  },

  warn: (message, data = {}) => {
    if (currentLevel <= LOG_LEVELS.WARN) {
      console.warn(`[WARN] ${message}`, data);
    }
  },

  error: (message, error = null) => {
    if (currentLevel <= LOG_LEVELS.ERROR) {
      console.error(`[ERROR] ${message}`, error);

      if (process.env.NODE_ENV === 'production' && window.Sentry) {
        window.Sentry.captureException(error, {
          tags: { message },
        });
      }
    }
  },

  analytics: (event, data = {}) => {
    if (process.env.NODE_ENV === 'production' && window.gtag) {
      window.gtag('event', event, data);
    } else {
      console.log(`[ANALYTICS] ${event}`, data);
    }
  },
};

export default logger;
