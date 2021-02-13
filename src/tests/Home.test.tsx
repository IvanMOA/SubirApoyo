import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Home } from '../App'
import { RecoilRoot} from 'recoil'

test('Count increases when button is clicked', () => {
  render( <RecoilRoot><Home /></RecoilRoot>);
  const counterContainer = screen.getByRole('heading')
  const buttonToIncreaseCounter = screen.getByRole('button')
  fireEvent(buttonToIncreaseCounter, new MouseEvent('click', { bubbles: true, cancelable: true}))
  expect(counterContainer.innerHTML).toMatch(new RegExp( /1/ ))
});
