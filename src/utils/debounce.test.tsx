import { render, screen, act } from '@testing-library/react';
import { useDebouncedValue } from './debounce';

jest.useFakeTimers();

const TestComponent = ({
  value,
  delay = 400,
}: {
  value: string;
  delay?: number;
}) => {
  const debouncedValue = useDebouncedValue(value, delay);

  return <div data-testid='value'>{debouncedValue}</div>;
};

describe('useDebouncedValue', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it('Первоначально возвращает начальное значение', () => {
    render(<TestComponent value='initial' />);
    expect(screen.getByTestId('value')).toHaveTextContent('initial');
  });

  it('Обновляет значение только после задержки', () => {
    const { rerender } = render(
      <TestComponent
        value='first'
        delay={500}
      />,
    );
    rerender(
      <TestComponent
        value='second'
        delay={500}
      />,
    );

    expect(screen.getByTestId('value')).toHaveTextContent('first');

    act(() => {
      jest.advanceTimersByTime(499);
    });

    expect(screen.getByTestId('value')).toHaveTextContent('first');

    act(() => {
      jest.advanceTimersByTime(1);
    });

    expect(screen.getByTestId('value')).toHaveTextContent('second');
  });

  it('Отменяет предыдущий таймер при быстром изменении значения', () => {
    const { rerender } = render(
      <TestComponent
        value='a'
        delay={300}
      />,
    );

    rerender(
      <TestComponent
        value='b'
        delay={300}
      />,
    );

    act(() => {
      jest.advanceTimersByTime(200);
    });

    rerender(
      <TestComponent
        value='c'
        delay={300}
      />,
    );

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(screen.getByTestId('value')).toHaveTextContent('a');

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(screen.getByTestId('value')).toHaveTextContent('c');
  });
});
