import { render, screen } from '@testing-library/react';
import 'jest-styled-components';

import { theme } from '@/theme/styledTheme';
import { Card } from './Card';

describe('Card', () => {
  it('Рендерит children', () => {
    render(<Card>Контент</Card>);

    expect(screen.getByText('Контент')).toBeInTheDocument();
  });

  it('Применяется padding по умолчанию', () => {
    const { container } = render(<Card>Контент</Card>);
    const card = container.firstChild;

    expect(card).toHaveStyleRule('padding', '16px');
  });

  it('Применяется padding "medium"', () => {
    const { container } = render(<Card padding='medium'>Контент</Card>);
    const card = container.firstChild;

    expect(card).toHaveStyleRule('padding', '20px 16px');
  });

  it('Применяется padding "large"', () => {
    const { container } = render(<Card padding='large'>Контент</Card>);
    const card = container.firstChild;

    expect(card).toHaveStyleRule('padding', '24px');
  });

  it('Применяется неактивный фон по умолчанию', () => {
    const { container } = render(<Card>Контент</Card>);
    const card = container.firstChild;

    expect(card).toHaveStyleRule('background', theme.colors.bgSecondary);
  });

  it('Применяется активный фон при active=true', () => {
    const { container } = render(<Card active>Контент</Card>);
    const card = container.firstChild;

    expect(card).toHaveStyleRule('background', theme.colors.bgShadows);
  });

  it('Применяется default курсор при hoverable=false', () => {
    const { container } = render(<Card>Контент</Card>);
    const card = container.firstChild;

    expect(card).toHaveStyleRule('cursor', 'default');
  });

  it('Применяется pointer курсор при hoverable=true', () => {
    const { container } = render(<Card hoverable>Контент</Card>);
    const card = container.firstChild;

    expect(card).toHaveStyleRule('cursor', 'pointer');
  });

  it('Применяется bgDisable фон при hover для hoverable=true active=false', () => {
    const { container } = render(<Card hoverable>Контент</Card>);
    const card = container.firstChild;

    expect(card).toHaveStyleRule('background', theme.colors.bgDisable, {
      modifier: ':hover',
    });
  });

  it('Применяется bgShadows фон при hover для hoverable=true active=true', () => {
    const { container } = render(
      <Card
        hoverable
        active>
        Контент
      </Card>,
    );
    const card = container.firstChild;

    expect(card).toHaveStyleRule('background', theme.colors.bgShadows, {
      modifier: ':hover',
    });
  });

  it('Применяется bgSecondary фон при hover для hoverable=false', () => {
    const { container } = render(<Card>Контент</Card>);
    const card = container.firstChild;

    expect(card).toHaveStyleRule('background', theme.colors.bgSecondary, {
      modifier: ':hover',
    });
  });

  it('Применяется корректный box-shadow для active=false', () => {
    const { container } = render(<Card>Контент</Card>);
    const card = container.firstChild;

    expect(card).toHaveStyleRule(
      'box-shadow',
      `${theme.colors.bgShadows} 0 4px 8px`,
    );
  });

  it('Применяется корректный box-shadow для active=true', () => {
    const { container } = render(<Card active>Контент</Card>);
    const card = container.firstChild;

    expect(card).toHaveStyleRule(
      'box-shadow',
      `${theme.colors.bgDisable} 0 4px 8px`,
    );
  });
});
