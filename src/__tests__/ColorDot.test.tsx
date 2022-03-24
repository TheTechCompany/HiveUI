// __tests__/ColorDot.test.ts
import React from 'react'

import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import { ColorDot } from '..'

import '@testing-library/jest-dom'

describe('ColorDot', () => {
    test('renders at specified size', () => {
        const { container } = render(<ColorDot size={5} color={'red'} />);
    
        const element = container.querySelector('.hive-color-dot');
    
        expect(element).toHaveStyle({
            background: 'red',
            width: '5px',
            height: '5px'
        });
    })
})
