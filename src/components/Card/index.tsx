import React from 'react';

interface Props {
    title: string;
    value: React.ReactNode;
}

const Card = ({ title, value }: Props) => (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="mt-1 text-lg font-semibold text-gray-900">{value}</p>
    </div>
);

export default Card;
