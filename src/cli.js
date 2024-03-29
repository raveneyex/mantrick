'use strict';

import arg from 'arg';
import chalk from 'chalk';

import {mantrick, verbalize_intent} from './mantrick.js';
import {RAVENEYEX_SIGIL_40x40_INVERTED} from './sigil-logo.js';

const CLEAN_SCREEN_CHARACTER = '\x1Bc';

function parseArgs(rawArgs) {

    const args = arg({
        '-s': Number,
        '-v': Boolean,
    },{ argv: rawArgs.slice(2) });

    if (!args['_'] || !args['_'].length) {
        throw new Error('An intent must be provided');
    }

    if (args['-s'] !== null && Object.is(NaN, args['-s'])) {
        throw new Error('A numeric seed must be provided for the -s flag');
    }

    return {
        intent: args['_'][0],
        seed: args['-s'],
        verbalize: args['-v'] !== null
    }
}

export function cli(args) {
    // Check if all flags are correct
    const { intent, seed, verbalize } = parseArgs(args);

    let result;

    if (verbalize) {
        result = verbalize_intent(intent)
    } else {
        result = mantrick(intent, seed)
    }
    
    // Print sigil-logo
    console.log(chalk.red.bold(RAVENEYEX_SIGIL_40x40_INVERTED));

    // Wait a full second
    setTimeout(() => {
        // clean screen
        console.log(CLEAN_SCREEN_CHARACTER);
        // Print mantra
        console.log('Your mantrick sigil is %s', chalk.green.bold(result));
    }, 100);
}
