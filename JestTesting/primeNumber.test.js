// prime.test.js
const isPrime = require('../primeNumber');

describe('isPrime function', () => {
    test('returns false for non-prime number 1', () => {
        expect(isPrime(1)).toBe(false);
    });

    test('returns true for prime number 2', () => {
        expect(isPrime(2)).toBe(true);
    });

    test('returns false for even non-prime number 4', () => {
        expect(isPrime(4)).toBe(false);
    });

    test('returns true for prime number 5', () => {
        expect(isPrime(5)).toBe(true);
    });

    test('returns false for non-prime number 9', () => {
        expect(isPrime(9)).toBe(false);
    });

    test('returns true for large prime number 97', () => {
        expect(isPrime(97)).toBe(true);
    });

    test('returns false for large non-prime number 100', () => {
        expect(isPrime(100)).toBe(false);
    });
});
