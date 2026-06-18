import React from 'react';
import { render, act } from '@testing-library/react';
import { ResourceProvider, useResource } from './ResourceContext';

function TestComponent() {
  const { designers, addDesigner } = useResource();

  return (
    <div>
      <div data-testid="count">{designers.length}</div>
      <button onClick={() => addDesigner({ name: 'Test', level: 'PD', employmentStatus: 'FTE' })}>
        Add
      </button>
    </div>
  );
}

describe('ResourceContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should provide initial data', () => {
    const { getByTestId } = render(
      <ResourceProvider>
        <TestComponent />
      </ResourceProvider>
    );

    // Should have 11 placeholder designers
    expect(getByTestId('count').textContent).toBe('11');
  });

  it('should add designer', () => {
    const { getByTestId, getByText } = render(
      <ResourceProvider>
        <TestComponent />
      </ResourceProvider>
    );

    act(() => {
      getByText('Add').click();
    });

    expect(getByTestId('count').textContent).toBe('12');
  });
});
