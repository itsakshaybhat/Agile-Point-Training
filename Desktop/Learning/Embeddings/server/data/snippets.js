const snippets = [
   {
      id: "debounce",
      title: "Debounce",
      description:
         "Delay running a function until the user stops triggering it for a bit — useful for search inputs, resize handlers, or button spam clicks.",
      code: `function debounce(fn, delay) {
  let timerId;

  return function (...args) {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}`,
   },

   {
      id: "throttle",
      title: "Throttle",
      description:
         "Limit how many times a function can run per time window — useful for scroll or mousemove event handlers.",
      code: `function throttle(fn, limit) {
  let waiting = false;

  return function (...args) {
    if (waiting) return;

    fn.apply(this, args);
    waiting = true;

    setTimeout(() => {
      waiting = false;
    }, limit);
  };
}`,
   },

   {
      id: "deepClone",
      title: "Deep Clone",
      description:
         "Make a full copy of a nested object or array so changes to the copy don't affect the original.",
      code: `function deepClone(value) {
  if (value === null || typeof value !== "object") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => deepClone(item));
  }

  const clonedObject = {};

  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      clonedObject[key] = deepClone(value[key]);
    }
  }

  return clonedObject;
}`,
   },

   {
      id: "deepEqual",
      title: "Deep Equal",
      description:
         "Check if two objects or arrays have the same values, even if nested, without comparing references.",
      code: `function deepEqual(a, b) {
  if (a === b) return true;

  if (
    a === null ||
    b === null ||
    typeof a !== "object" ||
    typeof b !== "object"
  ) {
    return false;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) {
    return false;
  }

  return keysA.every(
    (key) =>
      Object.prototype.hasOwnProperty.call(b, key) &&
      deepEqual(a[key], b[key])
  );
}`,
   },

   {
      id: "flattenArray",
      title: "Flatten Array",
      description:
         "Turn a nested array (arrays inside arrays) into one single flat array.",
      code: `function flattenArray(arr) {
  return arr.reduce((result, item) => {
    if (Array.isArray(item)) {
      return result.concat(flattenArray(item));
    }

    return result.concat(item);
  }, []);
}`,
   },

   {
      id: "uniqueArray",
      title: "Unique Array",
      description:
         "Remove duplicate values from an array, keeping only the first occurrence.",
      code: `function uniqueArray(arr) {
  return [...new Set(arr)];
}`,
   },

   {
      id: "groupBy",
      title: "Group By",
      description:
         "Split an array of objects into groups based on some property, like grouping orders by status.",
      code: `function groupBy(arr, keyFn) {
  return arr.reduce((groups, item) => {
    const key = keyFn(item);

    if (!groups[key]) {
      groups[key] = [];
    }

    groups[key].push(item);
    return groups;
  }, {});
}`,
   },

   {
      id: "memoize",
      title: "Memoize",
      description:
         "Cache a function's results so it doesn't repeat expensive work for the same inputs.",
      code: `function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);

    return result;
  };
}`,
   },

   {
      id: "curry",
      title: "Curry",
      description:
         "Turn a function that takes several arguments into one you can call one argument at a time.",
      code: `function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }

    return function (...nextArgs) {
      return curried.apply(this, [...args, ...nextArgs]);
    };
  };
}`,
   },

   {
      id: "composePipe",
      title: "Compose and Pipe",
      description:
         "Chain multiple functions together so the output of one feeds into the next, left-to-right or right-to-left.",
      code: `function pipe(...fns) {
  return function (value) {
    return fns.reduce((result, fn) => fn(result), value);
  };
}

function compose(...fns) {
  return function (value) {
    return fns.reduceRight((result, fn) => fn(result), value);
  };
}`,
   },

   {
      id: "retryWithBackoff",
      title: "Retry With Backoff",
      description:
         "Automatically retry an async operation (like an API call) a few times if it fails, waiting a bit longer each time.",
      code: `async function retryWithBackoff(fn, retries, delay) {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) {
      throw error;
    }

    await new Promise((resolve) => setTimeout(resolve, delay));

    return retryWithBackoff(fn, retries - 1, delay * 2);
  }
}`,
   },

   {
      id: "promiseAllLimit",
      title: "Promise All With Limit",
      description:
         "Run many async tasks (like API calls) in parallel, but only a limited number at the same time so you don't overload anything.",
      code: `async function promiseAllLimit(tasks, limit) {
  const results = new Array(tasks.length);
  let nextTaskIndex = 0;

  async function worker() {
    while (nextTaskIndex < tasks.length) {
      const currentIndex = nextTaskIndex;
      nextTaskIndex += 1;

      results[currentIndex] = await tasks[currentIndex]();
    }
  }

  const workerCount = Math.min(limit, tasks.length);

  const workers = Array.from(
    { length: workerCount },
    () => worker()
  );

  await Promise.all(workers);

  return results;
}`,
   },

   {
      id: "lruCache",
      title: "LRU Cache",
      description:
         "A fixed-size cache that automatically throws away the least recently used item when it gets full.",
      code: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) {
      return undefined;
    }

    const value = this.cache.get(key);

    this.cache.delete(key);
    this.cache.set(key, value);

    return value;
  }

  set(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    this.cache.set(key, value);

    if (this.cache.size > this.capacity) {
      const leastRecentlyUsedKey =
        this.cache.keys().next().value;

      this.cache.delete(leastRecentlyUsedKey);
    }
  }
}`,
   },

   {
      id: "eventEmitter",
      title: "Event Emitter",
      description:
         "A simple publish-subscribe system so different parts of your app can listen for and react to custom events.",
      code: `class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(eventName, listener) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, new Set());
    }

    this.events.get(eventName).add(listener);

    return () => this.off(eventName, listener);
  }

  off(eventName, listener) {
    const listeners = this.events.get(eventName);

    if (!listeners) return;

    listeners.delete(listener);

    if (listeners.size === 0) {
      this.events.delete(eventName);
    }
  }

  emit(eventName, ...args) {
    const listeners = this.events.get(eventName);

    if (!listeners) return;

    for (const listener of listeners) {
      listener(...args);
    }
  }
}`,
   },

   {
      id: "sleepDelay",
      title: "Sleep Delay",
      description:
         "Pause an async function for a set amount of time, like await sleep(1000) to wait one second.",
      code: `function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}`,
   },

   {
      id: "deepMerge",
      title: "Deep Merge",
      description:
         "Combine two nested objects into one, merging shared keys instead of one overwriting the other completely.",
      code: `function deepMerge(target, source) {
  const result = { ...target };

  for (const key of Object.keys(source)) {
    const sourceValue = source[key];
    const targetValue = result[key];

    const sourceIsObject =
      sourceValue !== null &&
      typeof sourceValue === "object" &&
      !Array.isArray(sourceValue);

    const targetIsObject =
      targetValue !== null &&
      typeof targetValue === "object" &&
      !Array.isArray(targetValue);

    if (sourceIsObject && targetIsObject) {
      result[key] = deepMerge(targetValue, sourceValue);
    } else {
      result[key] = sourceValue;
    }
  }

  return result;
}`,
   },

   {
      id: "chunkArray",
      title: "Chunk Array",
      description:
         "Split a big array into smaller arrays (chunks) of a fixed size, like splitting 100 items into pages of 10.",
      code: `function chunkArray(arr, size) {
  const chunks = [];

  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }

  return chunks;
}`,
   },

   {
      id: "singleton",
      title: "Singleton",
      description:
         "Make sure a class only ever has exactly one instance, no matter how many times you try to create it.",
      code: `class Singleton {
  static instance;

  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }

    Singleton.instance = this;
  }
}`,
   },
];


export default snippets;
