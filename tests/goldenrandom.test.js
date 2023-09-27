const GoldenRandom = require('../goldenrandom');

test('Setup config properly', () => {
    const gr = new GoldenRandom({
        ADDEND_A: 1,
        ADDEND_B: 1,
        ACCURACY: 20
    });
    const progress = gr.getProgress();
    expect(progress.ADDEND_A).toBe('1');
    expect(progress.ADDEND_B).toBe('1');
    expect(progress.ACCURACY).toBe(20);
});

test('Unique results prefer', () => {
    // Unique strongly depend on ACCURACY, so we set it to 5 as low as possible
    const gr = new GoldenRandom({
        ACCURACY: 5
    });
    const results = [];
    for (let i = 0; i < 100; i++) {
        results.push(gr.next());
    }
    // console.log(results);
    const uniqueResults = [...new Set(results)];
    expect(uniqueResults.length).toBe(100);
});

test('Unique accuracy', () => {
    const gr1 = new GoldenRandom({
        ACCURACY: 20
    });
    const gr2 = new GoldenRandom({
        ACCURACY: 1
    });
    const result1 = gr1.next();
    // console.log(result1);
    expect(result1.length).toBe(20);

    const result2 = gr2.next();
    // console.log(result2);
    expect(result2.length).toBe(1);
});

test('Get progress properly', () => {
    const config = {
        ADDEND_A: 3,
        ADDEND_B: 5,
        ACCURACY: 20
    };

    const gr = new GoldenRandom(config);
    const progress = gr.getProgress();
    expect(progress.ADDEND_A).toBe('3');
    expect(progress.ADDEND_B).toBe('5');
    expect(progress.ACCURACY).toBe(20);

    gr.next();

    const progress2 = gr.getProgress();
    expect(progress2.ADDEND_A).toBe('5');
    expect(progress2.ADDEND_B.length).toBe(22);
    expect(progress2.ACCURACY).toBe(20);
});

test('Calculate properly', () => {
    const gr = new GoldenRandom({
        ADDEND_A: 1,
        ADDEND_B: 2,
        ACCURACY: 3
    });

    // (1 + 2) / 1.618 = 1.854
    const result = gr.next();
    expect(result).toBe('854');

});