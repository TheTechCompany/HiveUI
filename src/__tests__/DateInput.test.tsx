// __tests__/ColorDot.test.ts
import React, { useState } from 'react'

import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import { DateInput } from '..'

import '@testing-library/jest-dom'

jest
    .useFakeTimers()
    .setSystemTime(new Date('2022-03-23').getTime());

describe('DateInput', () => {

    test('select date gives correct date', async () => {
        const { container } = render(<DateInput />);
        
        const calendarButton = container.querySelector('button');
        if(calendarButton){
            fireEvent.click(calendarButton);

            const date = await screen.findByText('10')

            fireEvent.click(date);

            const input = container.querySelector('input');
        
            expect(input).toHaveValue('10/03/2022');
        }
    })
})
