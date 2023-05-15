import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Calendar from './Calendar';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Calendar> = {
    title: 'Example/Calendar',
    component: Calendar,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        // backgroundColor: { control: 'color' },
    },
    decorators: [
        (Story) => {
            return (
                <div className="theme-background p-4">
                    <Story />
                </div>
            );
        },
    ],
};

export default meta;
type Story = StoryObj<typeof Calendar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Primary: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        // primary: true,
        // label: 'Button',
        year: 2023,
        selectedDate: '2023-05-03',
        // availableDates: [
        //     '2023-01-10',
        //     '2023-01-17',
        //     '2023-02-10',
        //     '2023-02-17',
        //     '2023-03-10',
        //     '2023-03-17',
        //     '2023-04-10',
        //     '2023-04-17',
        // ],
        // cloudyDates: [
        //     '2023-01-03',
        //     '2023-02-04',
        //     '2023-02-25',
        //     '2023-03-05',
        //     '2023-04-20',
        // ],
        acquisitionDates: [],
    },
};
