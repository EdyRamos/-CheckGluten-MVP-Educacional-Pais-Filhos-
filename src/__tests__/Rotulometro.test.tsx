import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Rotulometro } from '../components/Rotulometro';

describe('Rotulometro', () => {
  it('shows start button', () => {
    render(<Rotulometro />);
    expect(
      screen.getByText(/Aprenda a identificar ingredientes de risco/i)
    ).toBeTruthy();
    expect(
      screen.getByRole('button', { name: /começar/i })
    ).toBeTruthy();
  });
});
