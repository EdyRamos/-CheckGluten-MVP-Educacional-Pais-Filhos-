import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Checklists } from '../components/Checklists';

describe('Checklists', () => {
  it('renders checklist options', () => {
    render(<Checklists />);
    expect(screen.getByText('Cozinha Segura')).toBeTruthy();
    expect(screen.getByText('Festa Infantil')).toBeTruthy();
    expect(screen.getByText('Escola')).toBeTruthy();
  });
});
