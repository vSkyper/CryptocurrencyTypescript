import React, { useEffect, useState } from 'react';
import { AreaChart, ResponsiveContainer, Area, YAxis } from 'recharts';
import { AgGridReact } from 'ag-grid-react';
import { Link } from 'react-router-dom';
import { MainTableData, _mainTableData } from '../../Interfaces';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

const columnDefs = [
  {
    field: 'name',
    sortable: true,
    cellRenderer: (params: any) => (
      <Link
        className='flex items-center gap-2 hover:underline'
        to={`/coins/${params.data.id}`}
      >
        <img src={params.data.image} className='w-7' alt='logo' />
        {params.value}
      </Link>
    ),
  },
  {
    field: 'symbol',
    sortable: true,
    valueFormatter: (params: any) => params.value.toUpperCase(),
  },
  {
    field: 'current_price',
    headerName: 'Current price',
    sortable: true,
    valueFormatter: (params: any) =>
      Number(params.value).toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 8,
        style: 'currency',
        currency: 'USD',
      }),
  },
  {
    field: 'price_change_percentage_1h',
    headerName: '1h',
    sortable: true,
    cellClass: (params: any) => {
      if (params.value < 0) {
        return 'text-red-500';
      } else {
        return 'text-green-500';
      }
    },
    valueFormatter: (params: any) =>
      Number(params.value / 100).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        style: 'percent',
      }),
  },
  {
    field: 'price_change_percentage_24h',
    headerName: '24h',
    sortable: true,
    cellClass: (params: any) => {
      if (params.value < 0) {
        return 'text-red-500';
      } else {
        return 'text-green-500';
      }
    },
    valueFormatter: (params: any) =>
      Number(params.value / 100).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        style: 'percent',
      }),
  },
  {
    field: 'price_change_percentage_7d',
    headerName: '7d',
    sortable: true,
    cellClass: (params: any) => {
      if (params.value < 0) {
        return 'text-red-500';
      } else {
        return 'text-green-500';
      }
    },
    valueFormatter: (params: any) =>
      Number(params.value / 100).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        style: 'percent',
      }),
  },
  {
    field: 'total_volume',
    headerName: '24h volume',
    sortable: true,
    valueFormatter: (params: any) =>
      Number(params.value).toLocaleString('en-US', {
        maximumFractionDigits: 0,
        style: 'currency',
        currency: 'USD',
      }),
  },
  {
    field: 'market_cap',
    headerName: 'Market cap',
    sortable: true,
    valueFormatter: (params: any) =>
      Number(params.value).toLocaleString('en-US', {
        maximumFractionDigits: 0,
        style: 'currency',
        currency: 'USD',
      }),
  },
  {
    field: 'chart_in_7d',
    headerName: 'Last 7 days',
    cellRenderer: (params: any) => {
      const color =
        params.data.price_change_percentage_7d < 0 ? '#EF4444' : '#22C55E';
      return (
        <ResponsiveContainer>
          <AreaChart data={params.value}>
            <defs>
              <linearGradient
                id={`linearColor${params.rowIndex}`}
                x1='0'
                y1='0'
                x2='0'
                y2='1'
              >
                <stop offset='5%' stopColor={color} stopOpacity={0.4} />
                <stop offset='75%' stopColor={color} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <Area
              dataKey={(value) => value}
              stroke={color}
              fill={`url(#linearColor${params.rowIndex})`}
            />
            <YAxis dataKey={(value) => value} domain={['auto', 'auto']} hide />
          </AreaChart>
        </ResponsiveContainer>
      );
    },
  },
];

const MainCryptoTable: React.FC = () => {
  const [data, setData] = useState<MainTableData[]>(_mainTableData);

  useEffect(() => {
    fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d'
    )
      .then((response) => response.json())
      .then((data) => {
        setData([]);
        data.map((item: any) =>
          setData((prevData) => [
            ...prevData,
            {
              id: item.id,
              name: item.name,
              symbol: item.symbol,
              current_price: item.current_price,
              price_change_percentage_1h:
                item.price_change_percentage_1h_in_currency,
              price_change_percentage_24h:
                item.price_change_percentage_24h_in_currency,
              price_change_percentage_7d:
                item.price_change_percentage_7d_in_currency,
              total_volume: item.total_volume,
              market_cap: item.market_cap,
              chart_in_7d: item.sparkline_in_7d.price,
              image: item.image,
            },
          ])
        );
      });
  }, []);

  return (
    <div className='ag-theme-alpine-dark mt-5 w-full h-screen'>
      <AgGridReact
        rowData={data}
        columnDefs={columnDefs}
        animateRows={true}
        rowSelection='multiple'
      />
    </div>
  );
};

export default MainCryptoTable;
