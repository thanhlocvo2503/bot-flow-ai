interface ConnectProps {
    items?: string[];
}

const Connect = ({ items = [] }: ConnectProps) => (
    <div className="rounded-xl border bg-slate-50 p-4">
        <div className="mb-3 font-medium">Status</div>

        <div className="space-y-2">
            {items?.length ? (
                items.map((status, i) => (
                    <div
                        key={`${status}-${i}`}
                        className="rounded-md border bg-white p-3 text-sm"
                    >
                        {status}
                    </div>
                ))
            ) : (
                <div className="text-sm text-gray-500">No status yet...</div>
            )}
        </div>
    </div>
);

export default Connect;
