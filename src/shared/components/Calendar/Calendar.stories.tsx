/* Copyright 2024 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
        dateRange: {
            startDate: '2023-01-01',
            endDate: '2023-12-31',
        },
        selectedAcquisitionDate: '2023-05-03',
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
        availableScenes: [],
    },
};
