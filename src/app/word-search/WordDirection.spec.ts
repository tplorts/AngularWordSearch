import { WordDirection } from './WordDirection';


describe('WordDirection', () => {

  it('should create an up-right direction (1,1)', () => {
    const direction = new WordDirection(1, 1);
    expect(direction.deltaX).toBe(1);
    expect(direction.deltaY).toBe(1);
  });

  it('should have a total of 8 possible direcitons', () => {
    expect(WordDirection.All.length).toBe(8);
  });

});
