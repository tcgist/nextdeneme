import { Stock } from "@prisma/client";

interface StockListProps {
  stocks: Stock[];
}

export default function StockList({ stocks }: StockListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stocks.map((stock) => (
        <div
          key={stock.id}
          className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{stock.symbol}</h3>
            <span
              className={`text-sm font-medium ${
                Number(stock.change) >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {Number(stock.change) > 0 && "+"}
              {stock.change}%
            </span>
          </div>
          <p className="text-gray-600 mt-1">{stock.name}</p>
          <div className="mt-2 flex justify-between items-center">
            <span className="text-lg font-bold">₺{stock.price}</span>
            <span className="text-sm text-gray-500">{stock.sector}</span>
          </div>
        </div>
      ))}
    </div>
  );
} 