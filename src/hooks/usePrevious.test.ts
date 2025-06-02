import { renderHook } from '@testing-library/react';
import { usePrevious } from './usePrevious';

describe('usePrevious hook', () => {
  it('returns undefined on first render', () => {
    const { result } = renderHook(() => usePrevious('initial'));

    expect(result.current).toBeUndefined();
  });

  it('returns previous value after re-render', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 'first' }
    });

    // First render - should be undefined
    expect(result.current).toBeUndefined();

    // Re-render with new value
    rerender({ value: 'second' });

    // Should now return the previous value
    expect(result.current).toBe('first');
  });

  it('tracks value changes correctly through multiple renders', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 1 }
    });

    // First render
    expect(result.current).toBeUndefined();

    // Second render
    rerender({ value: 2 });
    expect(result.current).toBe(1);

    // Third render
    rerender({ value: 3 });
    expect(result.current).toBe(2);

    // Fourth render
    rerender({ value: 4 });
    expect(result.current).toBe(3);
  });

  it('works with different data types', () => {
    // Test with strings
    const { result: stringResult, rerender: stringRerender } = renderHook(
      ({ value }) => usePrevious(value),
      { initialProps: { value: 'hello' } }
    );

    stringRerender({ value: 'world' });
    expect(stringResult.current).toBe('hello');

    // Test with numbers
    const { result: numberResult, rerender: numberRerender } = renderHook(
      ({ value }) => usePrevious(value),
      { initialProps: { value: 42 } }
    );

    numberRerender({ value: 100 });
    expect(numberResult.current).toBe(42);

    // Test with booleans
    const { result: boolResult, rerender: boolRerender } = renderHook(
      ({ value }) => usePrevious(value),
      { initialProps: { value: true } }
    );

    boolRerender({ value: false });
    expect(boolResult.current).toBe(true);
  });

  it('works with complex objects', () => {
    const initialObject = { name: 'John', age: 30 };
    const updatedObject = { name: 'Jane', age: 25 };

    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: initialObject }
    });

    expect(result.current).toBeUndefined();

    rerender({ value: updatedObject });
    expect(result.current).toBe(initialObject);
    expect(result.current).toEqual({ name: 'John', age: 30 });
  });

  it('works with arrays', () => {
    const initialArray = [1, 2, 3];
    const updatedArray = [4, 5, 6];

    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: initialArray }
    });

    expect(result.current).toBeUndefined();

    rerender({ value: updatedArray });
    expect(result.current).toBe(initialArray);
    expect(result.current).toEqual([1, 2, 3]);
  });

  it('does not update when value stays the same', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 'same' }
    });

    expect(result.current).toBeUndefined();

    // Re-render with same value
    rerender({ value: 'same' });
    expect(result.current).toBe('same');

    // Re-render again with same value
    rerender({ value: 'same' });
    expect(result.current).toBe('same');

    // Now change the value
    rerender({ value: 'different' });
    expect(result.current).toBe('same');
  });
});
