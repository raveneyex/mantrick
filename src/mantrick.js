import _ from 'underscore';

const vowels_regex = /[aeiou]/i;

export function mantrick(intent, seed = 666) {
    const intention = intent.split('');
    
    const vowels = _.shuffle(intention.filter(letter => vowels_regex.test(letter)));

    const consonants = _.shuffle([
        ...intention
            .filter(letter => !vowels_regex.test(letter))
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
