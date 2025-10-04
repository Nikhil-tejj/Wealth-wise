import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import axios from "axios";
import Cookies from "js-cookie";

const COLORS = [
  "#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE", 
  "#00C49F", "#FFBB28", "#FF8042", "#a4de6c", "#d0ed57"
];

const AssetAllocationChart = ({ userId }) => {
  const [allocationData, setAllocationData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      const getCookie = Cookies.get("sessionToken");
      
      try {
        // First get user's stock data
        const stocksResponse = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}getstocks`,
          {
            params: { email: userId },
            headers: {
              Authorization: `Bearer ${getCookie}`,
              "Content-Type": "application/json",
            },
          }
        );
        
        const stocks = stocksResponse.data.stocks;
        
        if (!stocks || stocks.length === 0) {
          setAllocationData([]);
          setIsLoading(false);
          return;
        }
        
        // Fetch current prices for all stocks
        const profitLossResponse = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}portfolio-profit-loss`,
          {
            params: { email: userId },
            headers: {
              Authorization: `Bearer ${getCookie}`,
              "Content-Type": "application/json",
            },
          }
        );
        
        // Calculate asset allocation
        const stockDetails = profitLossResponse.data.stocks;
        let totalValue = 0;
        
        // First pass: calculate total value
        stockDetails.forEach(stock => {
          totalValue += stock.currentPrice * stock.quantity;
        });
        
        // Second pass: calculate percentage and create pie chart data
        const allocationData = stockDetails.map((stock, index) => {
          const value = stock.currentPrice * stock.quantity;
          const percentage = (value / totalValue) * 100;
          
          return {
            name: stock.symbol,
            value: value,
            percentage: percentage.toFixed(2)
          };
        });
        
        // Sort by value and limit to top 10 stocks
        const sortedData = allocationData
          .sort((a, b) => b.value - a.value)
          .slice(0, 10);
        
        setAllocationData(sortedData);
      } catch (error) {
        console.error("Error fetching asset allocation data:", error);
        setError("Failed to load asset allocation data");
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-800 p-2 rounded shadow-md">
          <p className="text-white font-medium">{`${data.name}`}</p>
          <p className="text-gray-300">{`Value: ${data.value.toFixed(2)}`}</p>
          <p className="text-gray-300">{`Allocation: ${data.percentage}%`}</p>
        </div>
      );
    }
    return null;
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.05) return null; // Don't show label for small slices

    return (
      <text 
        x={x} 
        y={y} 
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  if (allocationData.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-white">No stock data available</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={allocationData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius="75%"
          fill="#8884d8"
          dataKey="value"
        >
          {allocationData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          layout="vertical"
          verticalAlign="middle"
          align="right"
          formatter={(value, entry, index) => (
            <span className="text-white">{`${value} (${allocationData[index].percentage}%)`}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default AssetAllocationChart;
