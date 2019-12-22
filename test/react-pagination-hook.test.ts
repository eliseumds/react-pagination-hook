import { act, renderHook } from 'react-hooks-testing-library';
import { usePagination, PaginatorPiece } from '../src/react-pagination-hook';

// "!previous:1 1 2 3 ... 100 next:4" >> [
//   { type: 'previous', pageNumber: 1, isDisabled: true },
//   { type: 'page-number', pageNumber: 1 },
//   { type: 'page-number', pageNumber: 2 },
//   { type: 'page-number', pageNumber: 3 },
//   { type: 'ellipsis' },
//   { type: 'page-number', pageNumber: 100 },
//   { type: 'next', pageNumber: 4, isDisabled: false },
// ]
function buildExpectation(fullExpression: string): PaginatorPiece[] {
  return fullExpression
    .trim()
    .split(' ')
    .map(expression => {
      if (/^\d+$/.test(expression)) {
        return { type: 'page-number', pageNumber: Number(expression) };
      }

      if (expression === '...') {
        return { type: 'ellipsis' };
      }

      const matches = expression.match(/^([\!]*(previous|next))\:(\d+)$/);

      if (matches) {
        const bits = matches[0].split(':');
        let type: 'previous' | 'next';
        let pageNumber: number = Number(bits[1]);
        let isDisabled: boolean = false;

        if (bits[0].startsWith('!')) {
          isDisabled = true;
          type = bits[0].slice(1) as any;
        } else {
          type = bits[0] as any;
        }

        return { type, pageNumber, isDisabled };
      }

      throw new TypeError(`buildExpectation(arg): invalid expression "${expression}"`);
    });
}

describe('react-pagination-hook', () => {
  test('is defined', () => {
    expect(typeof usePagination).toBe('function');
  });

  test('break without required properties', () => {
    const hook1 = renderHook(() => usePagination(undefined as any));
    expect(hook1.result.error).toBeInstanceOf(TypeError);

    const hook2 = renderHook(() => usePagination(1 as any));
    expect(hook2.result.error).toBeInstanceOf(TypeError);
  });

  test('prevents out-of-range initial page', () => {
    const hook = renderHook(() =>
      usePagination({
        initialPage: 99, // << higher than numberOfPages
        numberOfPages: 10,
      })
    );

    expect(hook.result.current.activePage).toBe(10);
  });

  describe('with basic config', () => {
    const hook = renderHook(
      (props: { initialPage: number }) =>
        usePagination({
          numberOfPages: 10,
          maxButtons: 3,
          initialPage: props.initialPage,
        }),
      {
        initialProps: {
          initialPage: 1,
        },
      }
    );

    test('return initial state on initial render', () => {
      expect(hook.result.current.activePage).toBe(1);
      expect(hook.result.current.isFirst).toBe(true);
      expect(hook.result.current.isLast).toBe(false);
      expect(hook.result.current.hasPrevious).toBe(false);
      expect(hook.result.current.hasNext).toBe(true);
      expect(typeof hook.result.current.goToPage).toBe('function');

      const expectation = '!previous:1 1 2 3 ... 10 next:2';

      expect(hook.result.current.visiblePieces).toStrictEqual(buildExpectation(expectation));
    });

    test('navigate to the second page', () => {
      act(() => {
        hook.result.current.goToPage(2);
      });

      expect(hook.result.current.activePage).toBe(2);
      expect(hook.result.current.isFirst).toBe(false);
      expect(hook.result.current.isLast).toBe(false);
      expect(hook.result.current.hasPrevious).toBe(true);
      expect(hook.result.current.hasNext).toBe(true);

      const expectation = 'previous:1 1 2 3 ... 10 next:3';

      expect(hook.result.current.visiblePieces).toStrictEqual(buildExpectation(expectation));
    });

    test('rerender with initialPage as the last one', () => {
      hook.rerender({ initialPage: 10 });

      expect(hook.result.current.activePage).toBe(10);
      expect(hook.result.current.isFirst).toBe(false);
      expect(hook.result.current.isLast).toBe(true);
      expect(hook.result.current.hasPrevious).toBe(true);
      expect(hook.result.current.hasNext).toBe(false);

      const expectation = 'previous:9 1 ... 8 9 10 !next:10';

      expect(hook.result.current.visiblePieces).toStrictEqual(buildExpectation(expectation));
    });
  });

  test('few pages', () => {
    const hook = renderHook(() =>
      usePagination({
        numberOfPages: 5,
        maxButtons: 10,
        initialPage: 1,
      })
    );

    const expectation = '1 2 3 4 5';

    expect(hook.result.current.visiblePieces).toStrictEqual(buildExpectation(expectation));
  });

  test('maximum 1 button', () => {
    const hook = renderHook(() =>
      usePagination({
        numberOfPages: 3,
        maxButtons: 1,
        initialPage: 1,
      })
    );

    expect(hook.result.current.visiblePieces).toStrictEqual(
      buildExpectation('!previous:1 1 next:2')
    );

    act(() => {
      hook.result.current.goToPage(2);
    });

    expect(hook.result.current.visiblePieces).toStrictEqual(
      buildExpectation('previous:1 2 next:3')
    );

    act(() => {
      hook.result.current.goToPage(3);
    });

    expect(hook.result.current.visiblePieces).toStrictEqual(
      buildExpectation('previous:2 3 !next:3')
    );
  });
});
