import arg from 'arg';
import {mantrick} from './mantrick';

function parseArgs(rawArgs) {
  const args = arg({
    '-s': Number
  },{ argv: rawArgs.slice(2) });

  if (!args['_'] || !args['_'].length) {
    throw new Error('An intent must be provided');
  }

  if (args['-s'] !== null && Object.is(NaN, args['-s'])) {
    throw new Error('A numeric seed must be provided for the -s flag');
  }

  return {
    intent: args['_'][0],
    seed: args['-s']
  }
}

export function cli(args) {
  const { intent, seed } = parseArgs(args),
    mantra = mantrick(intent, seed);
    
  console.log("Your mantra is:", mantra);
}