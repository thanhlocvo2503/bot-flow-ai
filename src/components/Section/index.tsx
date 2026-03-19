import React from 'react';

interface Props {
    title: string;
    children: React.ReactNode;
}

const Section = ({ title, children }: Props) => (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 w-full">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">{title}</h2>
        {children}
    </div>
);

export default Section;
