import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  it('disables Prev button when hasPrev is false and enables Next when hasNext is true', () => {
    const onPrev = vi.fn();
    const onNext = vi.fn();

    render(<Pagination page={1} hasPrev={false} hasNext={true} onPrev={onPrev} onNext={onNext} />);

    const prevButton = screen.getByRole('button', { name: /prev/i });
    const nextButton = screen.getByRole('button', { name: /next/i });

    expect(prevButton).toBeDisabled();
    expect(nextButton).not.toBeDisabled();
  });

  it('calls onPrev and onNext when buttons are clicked', () => {
    const onPrev = vi.fn();
    const onNext = vi.fn();

    render(<Pagination page={2} hasPrev={true} hasNext={true} onPrev={onPrev} onNext={onNext} />);

    const prevButton = screen.getByRole('button', { name: /prev/i });
    const nextButton = screen.getByRole('button', { name: /next/i });

    fireEvent.click(prevButton);
    fireEvent.click(nextButton);

    expect(onPrev).toHaveBeenCalledTimes(1);
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it('renders current page number', () => {
    render(
      <Pagination page={5} hasPrev={true} hasNext={false} onPrev={() => {}} onNext={() => {}} />,
    );

    expect(screen.getByText('5')).toBeInTheDocument();
  });
});
