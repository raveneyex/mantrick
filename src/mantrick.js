import _ from 'underscore';

const vowels_regex = /[aeiou]/i;

const letters_regex = /[a-z]/i;

export function mantrick(intent, seed = 666) {
    const intention = intent.toLowerCase().split('');
    
    const vowels = _.shuffle(intention.filter(letter => vowels_regex.test(letter)));

    const consonants = _.shuffle([
        ...intention
            .filter(letter => letter && letter !== ' ' && !vowels_regex.test(letter))
            .reduce((acc, next) => acc.add(next), new Set())
            .values()
        ]);

    const randomIndex = Math.floor(Math.random() * seed * 10) % vowels.length;

    const aVowel = vowels[randomIndex];
    
    const mantra = consonants
        .slice(0, 3)
        .map(letter => `${letter}${aVowel}`)
        .join('');
    
    return mantra;
}

export function verbalize_intent(intent) {
    const intention = intent.toLowerCase().split('');
    // console.log("Intention:", intention)

    const consonants = _.shuffle([
        ...intention
            .filter(letter => letter && letter !== ' ' && !vowels_regex.test(letter) && letters_regex.test(letter))
            .reduce((acc, next) => {
                // console.log("Next letter to add:", next);
                // console.log("State of accumulator:", acc)
                acc.add(next);
                return acc;
            }, new Set())
            .values()
        ]);
    
    // console.log("Consonants after process:", consonants)

    const verbalized_intent = consonants.join('');

    // console.log("Verbalized intent:", verbalized_intent)

    return verbalized_intent;
}