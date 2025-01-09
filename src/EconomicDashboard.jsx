import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, ReferenceArea, ReferenceLine
} from 'recharts';
import { AuthorModal } from './components/AuthorModal';

const EconomicDashboard = () => {
  const [selectedMetric, setSelectedMetric] = useState('exchangeRate');
  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false);

  // Sophisticated color palette
  const colors = {
    primary: '#1E364D',      // Deep steel blue
    secondary: '#F5F3F0',    // Warm gray
    accent: {
      sage: '#94A89A',
      terracotta: '#C8A598',
      navy: '#2A4365',
      gold: '#B7A99A'
    },
    text: {
      primary: '#1E364D',
      secondary: '#64748B'
    },
    background: {
      primary: '#FDFCFA',
      secondary: '#F5F3F0'
    },
    chart: {
      congress: {
        primary: '#94A89A',
        bg: 'rgba(148, 168, 154, 0.1)'
      },
      bjp: {
        primary: '#C8A598',
        bg: 'rgba(200, 165, 152, 0.1)'
      },
      united: {
        primary: '#B7A99A',
        bg: 'rgba(183, 169, 154, 0.1)'
      }
    }
  };

  const metricConfigs = {
    exchangeRate: {
      label: 'Exchange Rate (₹/$)',
      color: colors.primary,
      domain: ['dataMin - 5', 'dataMax + 5'],
      icon: '₹'
    },
    annualChange: {
      label: 'Annual Rate Change (%)',
      color: colors.accent.sage,
      domain: [-15, 15],
      icon: '📊'
    },
    gdpGrowth: {
      label: 'GDP Growth (%)',
      color: colors.accent.sage,
      domain: [-8, 12],
      icon: '📈'
    },
    inflation: {
      label: 'Inflation (%)',
      color: colors.accent.terracotta,
      domain: [0, 15],
      icon: '📊'
    },
    govtDebt: {
      label: 'Govt Debt (% of GDP)',
      color: colors.accent.navy,
      domain: [60, 90],
      icon: '📉'
    }
  };

  // [Previous economicData array remains the same]
  const economicData = [
    { year: "1991-92", exchangeRate: 24.47, gdpGrowth: 1.1, inflation: 13.5, unemployment: 6.8, govtDebt: 75.3, government: "Congress (Rao)", event: "Economic Liberalization" },
    { year: "1992-93", exchangeRate: 30.65, gdpGrowth: 5.5, inflation: 9.9, unemployment: 6.8, govtDebt: 77.4, government: "Congress (Rao)" },
    { year: "1993-94", exchangeRate: 31.37, gdpGrowth: 4.8, inflation: 7.3, unemployment: 6.8, govtDebt: 77.0, government: "Congress (Rao)" },
    { year: "1994-95", exchangeRate: 31.40, gdpGrowth: 6.7, inflation: 10.3, unemployment: 6.8, govtDebt: 73.5, government: "Congress (Rao)" },
    { year: "1995-96", exchangeRate: 33.45, gdpGrowth: 7.6, inflation: 10.0, unemployment: 7.0, govtDebt: 69.7, government: "Congress (Rao)" },
    { year: "1996-97", exchangeRate: 35.50, gdpGrowth: 7.6, inflation: 9.4, unemployment: 7.2, govtDebt: 66.0, government: "United Front" },
    { year: "1997-98", exchangeRate: 37.16, gdpGrowth: 4.1, inflation: 6.8, unemployment: 7.3, govtDebt: 67.8, government: "United Front" },
    { year: "1998-99", exchangeRate: 42.07, gdpGrowth: 6.2, inflation: 13.1, unemployment: 7.5, govtDebt: 68.1, government: "BJP (Vajpayee)" },
    { year: "1999-00", exchangeRate: 43.33, gdpGrowth: 8.5, inflation: 5.7, unemployment: 7.7, govtDebt: 70.0, government: "BJP (Vajpayee)" },
    { year: "2000-01", exchangeRate: 45.68, gdpGrowth: 4.0, inflation: 3.8, unemployment: 7.8, govtDebt: 73.6, government: "BJP (Vajpayee)" },
    { year: "2001-02", exchangeRate: 47.69, gdpGrowth: 4.9, inflation: 4.3, unemployment: 8.0, govtDebt: 78.7, government: "BJP (Vajpayee)" },
    { year: "2002-03", exchangeRate: 48.40, gdpGrowth: 3.9, inflation: 4.0, unemployment: 8.2, govtDebt: 82.9, government: "BJP (Vajpayee)" },
    { year: "2003-04", exchangeRate: 45.95, gdpGrowth: 7.9, inflation: 3.9, unemployment: 8.4, govtDebt: 84.4, government: "BJP (Vajpayee)" },
    { year: "2004-05", exchangeRate: 44.93, gdpGrowth: 7.8, inflation: 3.8, unemployment: 8.5, govtDebt: 83.4, government: "Congress (UPA)" },
    { year: "2005-06", exchangeRate: 44.27, gdpGrowth: 9.3, inflation: 4.4, unemployment: 8.7, govtDebt: 81.0, government: "Congress (UPA)" },
    { year: "2006-07", exchangeRate: 45.28, gdpGrowth: 9.3, inflation: 6.7, unemployment: 8.6, govtDebt: 77.2, government: "Congress (UPA)" },
    { year: "2007-08", exchangeRate: 40.24, gdpGrowth: 10.3, inflation: 6.2, unemployment: 8.5, govtDebt: 74.1, government: "Congress (UPA)" },
    { year: "2008-09", exchangeRate: 45.92, gdpGrowth: 3.9, inflation: 9.1, unemployment: 8.5, govtDebt: 72.8, government: "Congress (UPA)", event: "Global Financial Crisis" },
    { year: "2009-10", exchangeRate: 47.42, gdpGrowth: 7.9, inflation: 12.3, unemployment: 8.4, govtDebt: 71.5, government: "Congress (UPA)" },
    { year: "2010-11", exchangeRate: 45.58, gdpGrowth: 8.5, inflation: 10.5, unemployment: 8.3, govtDebt: 66.4, government: "Congress (UPA)" },
    { year: "2011-12", exchangeRate: 47.92, gdpGrowth: 6.6, inflation: 9.5, unemployment: 8.2, govtDebt: 68.6, government: "Congress (UPA)" },
    { year: "2012-13", exchangeRate: 54.41, gdpGrowth: 5.5, inflation: 10.0, unemployment: 8.1, govtDebt: 68.0, government: "Congress (UPA)" },
    { year: "2013-14", exchangeRate: 60.50, gdpGrowth: 6.4, inflation: 9.4, unemployment: 8.1, govtDebt: 67.7, government: "Congress (UPA)" },
    { year: "2014-15", exchangeRate: 61.14, gdpGrowth: 7.4, inflation: 5.8, unemployment: 8.0, govtDebt: 67.1, government: "BJP (Modi)" },
    { year: "2015-16", exchangeRate: 65.47, gdpGrowth: 8.0, inflation: 4.9, unemployment: 7.9, govtDebt: 69.0, government: "BJP (Modi)" },
    { year: "2016-17", exchangeRate: 67.07, gdpGrowth: 8.3, inflation: 4.5, unemployment: 7.8, govtDebt: 68.9, government: "BJP (Modi)", event: "Demonetization" },
    { year: "2017-18", exchangeRate: 64.45, gdpGrowth: 6.8, inflation: 3.6, unemployment: 7.7, govtDebt: 69.7, government: "BJP (Modi)" },
    { year: "2018-19", exchangeRate: 69.92, gdpGrowth: 6.5, inflation: 3.4, unemployment: 7.7, govtDebt: 70.4, government: "BJP (Modi)" },
    { year: "2019-20", exchangeRate: 74.53, gdpGrowth: 4.2, inflation: 4.8, unemployment: 6.5, govtDebt: 75.0, government: "BJP (Modi)" },
    { year: "2020-21", exchangeRate: 73.23, gdpGrowth: -5.8, inflation: 6.1, unemployment: 7.9, govtDebt: 88.5, government: "BJP (Modi)", event: "COVID-19 Pandemic" },
    { year: "2021-22", exchangeRate: 82.44, gdpGrowth: 9.7, inflation: 5.5, unemployment: 6.4, govtDebt: 83.7, government: "BJP (Modi)" },
    { year: "2022-23", exchangeRate: 82.04, gdpGrowth: 7.2, inflation: 6.7, unemployment: 4.8, govtDebt: 81.0, government: "BJP (Modi)" },
    { year: "2023-24", exchangeRate: 83.04, gdpGrowth: 7.0, inflation: 4.6, unemployment: 4.7, govtDebt: 82.3, government: "BJP (Modi)" },
  ];


  // Calculate annual changes
  const calculateAnnualChanges = () => {
    return economicData.map((data, index) => {
      if (index === 0) return { ...data, annualChange: 0 };
      const previousRate = economicData[index - 1].exchangeRate;
      const currentRate = data.exchangeRate;
      const annualChange = ((currentRate - previousRate) / previousRate) * 100;
      return { ...data, annualChange };
    });
  };

  const dataWithChanges = calculateAnnualChanges();

  // Render Functions
  const renderChart = (metric, data = economicData) => (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E1DB" />
        <XAxis
          dataKey="year"
          angle={-45}
          textAnchor="end"
          height={60}
          tick={{ fill: '#64748B', fontSize: 12 }}
        />
        <YAxis
          domain={metricConfigs[metric].domain}
          tick={{ fill: '#64748B', fontSize: 12 }}
          label={{
            value: metricConfigs[metric].label,
            angle: -90,
            position: 'insideLeft',
            style: { fill: '#64748B', fontSize: 12 }
          }}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              return (
                <div className="bg-white px-6 py-4 rounded-lg shadow-lg border border-gray-100">
                  <p className="font-medium text-[#1E364D]">{data.year}</p>
                  <p className="text-[#64748B] mt-2">
                    {metricConfigs[metric].label}: {data[metric]}
                    {metric === 'annualChange' ? '%' : ''}
                  </p>
                  <p className="text-[#64748B]">
                    Government: {data.government}
                  </p>
                  {data.event && (
                    <p className="text-[#94A89A] mt-2 font-medium">
                      {data.event}
                    </p>
                  )}
                </div>
              );
            }
            return null;
          }}
        />

        {/* Government Period Areas */}
        <ReferenceArea
          x1="1991-92"
          x2="1996-97"
          fill={colors.chart.congress.bg}
          label={{
            value: "Congress (Rao)",
            position: "insideTop",
            fill: colors.chart.congress.primary,
            fontSize: 11
          }}
        />
        <ReferenceArea
          x1="1996-97"
          x2="1998-99"
          fill={colors.chart.united.bg}
          label={{
            value: "United Front",
            position: "insideTop",
            fill: colors.chart.united.primary,
            fontSize: 11
          }}
        />
        <ReferenceArea
          x1="1998-99"
          x2="2004-05"
          fill={colors.chart.bjp.bg}
          label={{
            value: "BJP (Vajpayee)",
            position: "insideTop",
            fill: colors.chart.bjp.primary,
            fontSize: 11
          }}
        />
        <ReferenceArea
          x1="2004-05"
          x2="2014-15"
          fill={colors.chart.congress.bg}
          label={{
            value: "Congress (UPA)",
            position: "insideTop",
            fill: colors.chart.congress.primary,
            fontSize: 11
          }}
        />
        <ReferenceArea
          x1="2014-15"
          x2="2023-24"
          fill={colors.chart.bjp.bg}
          label={{
            value: "BJP (Modi)",
            position: "insideTop",
            fill: colors.chart.bjp.primary,
            fontSize: 11
          }}
        />

        <Line
          type="monotone"
          dataKey={metric}
          stroke={metricConfigs[metric].color}
          strokeWidth={2}
          dot={{ fill: metricConfigs[metric].color, r: 4 }}
          activeDot={{ r: 6 }}
        />

        {/* Event Markers */}
        {economicData
          .filter((d) => d.event)
          .map((d) => (
            <ReferenceLine
              key={d.year}
              x={d.year}
              stroke="#E5E1DB"
              strokeDasharray="3 3"
              label={{
                value: `${d.event} 📌`,
                position: 'top',
                fill: '#64748B',
                fontSize: 11,
              }}
            />
          ))}
      </LineChart>
    </ResponsiveContainer>
  );

  return (
    <div className="min-h-screen bg-[#FDFCFA]">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">₹</span>
              <span className="text-[#1E364D] font-medium">India's Economic Journey</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsAuthorModalOpen(true)}
                className="text-[#1E364D] hover:text-[#94A89A] transition-colors"
              >
                About
              </button>
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1E364D] hover:text-[#94A89A] transition-colors"
              >
                <span className="text-xl">⌨️</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-light text-[#1E364D] mb-4">
            India's Economic Journey
          </h1>
          <p className="text-[#64748B] max-w-2xl mx-auto">
            Analyzing three decades of economic transformation through the lens of 
            key indicators and policy changes (1991-2024)
          </p>
        </div>

        {/* Exchange Rate Section */}
        <div className="space-y-8 mb-16">
          <h2 className="text-2xl font-light text-[#1E364D]">Exchange Rate Analysis</h2>
          
          {/* USD/INR Rate Chart */}
          <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm">
            <h3 className="text-xl font-light text-[#1E364D] mb-6">USD to INR Exchange Rate</h3>
            <div className="h-[500px]">
              {renderChart('exchangeRate')}
            </div>
          </div>

          {/* Annual Change Rate Chart */}
          <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm">
            <h3 className="text-xl font-light text-[#1E364D] mb-6">Annual Rate Change (%)</h3>
            <div className="h-[500px]">
              {renderChart('annualChange', dataWithChanges)}
            </div>
          </div>
        </div>

        {/* Other Metrics Section */}
        <div className="space-y-8 mb-16">
          <h2 className="text-2xl font-light text-[#1E364D]">Other Economic Indicators</h2>
          
          {/* GDP Growth Chart */}
          <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm">
            <h3 className="text-xl font-light text-[#1E364D] mb-6">GDP Growth Rate (%)</h3>
            <div className="h-[500px]">
              {renderChart('gdpGrowth')}
            </div>
          </div>

          {/* Inflation Chart */}
          <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm">
            <h3 className="text-xl font-light text-[#1E364D] mb-6">Inflation Rate (%)</h3>
            <div className="h-[500px]">
              {renderChart('inflation')}
            </div>
          </div>

          {/* Government Debt Chart */}
          <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm">
            <h3 className="text-xl font-light text-[#1E364D] mb-6">Government Debt (% of GDP)</h3>
            <div className="h-[500px]">
              {renderChart('govtDebt')}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-12">
          <div className="flex justify-center gap-8 mb-8">
          <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.chart.congress.primary }}></div>
              <span className="text-[#64748B]">Congress Periods</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.chart.bjp.primary }}></div>
              <span className="text-[#64748B]">BJP Periods</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.chart.united.primary }}></div>
              <span className="text-[#64748B]">United Front</span>
            </div>
          </div>
          <div className="mx-auto max-w-2xl">
            <p className="text-[#64748B] text-sm">
              Data sources: Reserve Bank of India (RBI), World Bank, and International Monetary Fund (IMF)
            </p>
            <p className="text-[#64748B] text-sm mt-4">
              © {new Date().getFullYear()} Nasir Mirza • All rights reserved
            </p>
          </div>
        </footer>
      </main>

      {/* Author Modal */}
      <AuthorModal 
        isOpen={isAuthorModalOpen} 
        onClose={() => setIsAuthorModalOpen(false)} 
      />
    </div>
  );
};

export default EconomicDashboard;