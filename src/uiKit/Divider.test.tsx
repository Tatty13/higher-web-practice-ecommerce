import { render } from '@testing-library/react';
import 'jest-styled-components';

import { tokens } from '@/theme/tokens';
import { Divider } from './Divider';

describe('Divider', () => {
  it('Применяется neutralDisable цвет по умолчанию', () => {
    const { container } = render(<Divider />);
    const divider = container.firstChild;

    expect(divider).toHaveStyleRule('background', tokens.colors.neutralDisable);
  });

  it('Применяется neutralDisable цвет при color=dark', () => {
    const { container } = render(<Divider color='dark' />);
    const divider = container.firstChild;

    expect(divider).toHaveStyleRule('background', tokens.colors.neutralDisable);
  });

  it('Применяется bgShadows цвет при color=light', () => {
    const { container } = render(<Divider color='light' />);
    const divider = container.firstChild;

    expect(divider).toHaveStyleRule('background', tokens.colors.bgShadows);
  });

  it('Применяется margin 0 по умолчанию', () => {
    const { container } = render(<Divider />);
    const divider = container.firstChild;

    expect(divider).toHaveStyleRule('margin', '0');
  });

  it('Применяется валидный margin с одним значением', () => {
    const { container } = render(<Divider margin='12px' />);
    const divider = container.firstChild;

    expect(divider).toHaveStyleRule('margin', '12px');
  });

  it('Применяется валидный margin с двумя значениями', () => {
    const { container } = render(<Divider margin='12px 10px' />);
    const divider = container.firstChild;

    expect(divider).toHaveStyleRule('margin', '12px 10px');
  });

  it('Применяется валидный margin с тремя значениями', () => {
    const { container } = render(<Divider margin='12px 10px 16px' />);
    const divider = container.firstChild;

    expect(divider).toHaveStyleRule('margin', '12px 10px 16px');
  });

  it('Применяется валидный margin с четырьмя значениями', () => {
    const { container } = render(<Divider margin='12px 10px 16px 4px' />);
    const divider = container.firstChild;

    expect(divider).toHaveStyleRule('margin', '12px 10px 16px 4px');
  });
});
