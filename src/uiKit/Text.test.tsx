import { render, screen } from '@testing-library/react';
import 'jest-styled-components';

import { tokens } from '@/theme/tokens';
import { Text } from './Text';

describe('Text', () => {
  it('Рендерит текст', () => {
    render(<Text>Текст</Text>);

    expect(screen.getByText('Текст')).toBeInTheDocument();
  });

  it('Применяется font size по умолчанию', () => {
    const { container } = render(<Text>Текст</Text>);
    const text = container.firstChild;

    expect(text).toHaveStyleRule(
      'font-size',
      tokens.typography.fontSize + 'px',
    );
  });

  it('Применяется заданный font size', () => {
    const { container } = render(<Text size={20}>Текст</Text>);
    const text = container.firstChild;

    expect(text).toHaveStyleRule('font-size', '20px');
  });

  it('Применяется inherit color по умолчанию', () => {
    const { container } = render(<Text>Текст</Text>);
    const text = container.firstChild;

    expect(text).toHaveStyleRule('color', 'inherit');
  });

  it('Применяется заданный color', () => {
    const { container } = render(<Text color='red'>Текст</Text>);
    const text = container.firstChild;

    expect(text).toHaveStyleRule('color', 'red');
  });
});
