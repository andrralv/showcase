import { render } from '@testing-library/react'
import { expect, test } from 'vitest'
import Bento from '../Bento'

// have to mock Apollo / Providers for tests to work - skipping for now

test('BentoBox', () => {
  test('When opening the page, there should be 12 arranged boxes', () => {
    const { container} = render(<Bento />);
    const bentoBox = container.getElementsByClassName('bento-box');
    expect(bentoBox.length).toBe(12);
  })
});