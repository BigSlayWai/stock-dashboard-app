<a id="readme-top"></a>

# Stock Portfolio Tracker

A real-time stock portfolio management application built with Next.js, allowing users to track their investments, monitor profit & loss, and visualize portfolio allocation with live market data.

## 🌐 Live Demo

*Coming soon - Deploy to Vercel to share your live demo link*

## 📋 Table of Contents

- [About The Project](#about-the-project)
- [Built With](#built-with)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [API Rate Limits](#api-rate-limits)
- [Contributing](#contributing)
- [Future Enhancements](#future-enhancements)

## About The Project

The Stock Portfolio Tracker is a modern investment tracking application that provides real-time stock price updates, profit & loss calculations, and portfolio analytics. Built with Next.js and TypeScript, it offers a seamless user experience for managing your stock investments with live market data from Alpha Vantage.

### Built With

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![TypeScript][TypeScript]][TypeScript-url]
* [![Tailwind CSS][TailwindCSS]][Tailwind-url]
* [![Recharts][Recharts]][Recharts-url]
* [![Chart.js][ChartJS]][ChartJS-url]
* [![Axios][Axios]][Axios-url]

## ✨ Features

- 📊 **Real-Time Stock Prices**: Live market data from Alpha Vantage API
- 💰 **Profit & Loss Tracking**: Automatic calculation of gains/losses for each position
- 📈 **Portfolio Analytics**: View total portfolio value, cost basis, and overall P&L
- 🥧 **Allocation Visualization**: Interactive pie chart showing portfolio distribution
- 🔄 **Manual Price Refresh**: Update all stock prices with a single click
- 📱 **Responsive Design**: Optimized for desktop and mobile devices
- 💾 **Local Storage**: Your portfolio data is saved in your browser
- 🎨 **Modern UI**: Beautiful gradient design with smooth animations
- 📉 **Performance Metrics**: Color-coded P&L indicators (green for profit, red for loss)
- ➕ **Easy Stock Management**: Add and remove stocks with simple forms

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
* Node.js (v18 or higher)
* npm, yarn, pnpm, or bun
* Alpha Vantage API key (free tier available)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/stock-dashboard-app.git
   cd stock-dashboard-app/trading-dashboard
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables (see [Environment Variables](#environment-variables))

4. Run the development server
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Alpha Vantage API Key
# Get your free API key at: https://www.alphavantage.co/support/#api-key
NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY=your_api_key_here
```

**Important Notes:**
- The `NEXT_PUBLIC_` prefix is required since API calls are made from the client-side
- Free tier limits: 500 API calls per day, 5 calls per minute
- Sign up at [Alpha Vantage](https://www.alphavantage.co/) to get your free API key

## 📁 Project Structure

```
trading-dashboard/
├── app/                           # Next.js app directory
│   ├── layout.tsx                 # Root layout with metadata
│   ├── page.tsx                   # Main dashboard page
│   ├── globals.css                # Global styles
│   └── favicon.ico                # App icon
├── components/                    # React components
│   ├── ui/
│   │   └── button.tsx             # Reusable button component
│   ├── AddStockForm.tsx           # Form to add new stocks
│   ├── StockCard.tsx              # Individual stock display card
│   ├── StockCardSkeleton.tsx      # Loading skeleton
│   ├── PortfolioSummary.tsx       # Portfolio overview section
│   └── AllocationChart.tsx        # Pie chart for portfolio allocation
├── lib/                           # Utility functions and business logic
│   ├── stockApi.ts                # Alpha Vantage API integration
│   ├── calculations.ts            # P&L and portfolio calculations
│   ├── storage.ts                 # localStorage management
│   └── utils.ts                   # Helper utilities
├── types/                         # TypeScript type definitions
│   └── stock.ts                   # Stock interfaces and types
├── public/                        # Static assets
├── .env.local                     # Environment variables (not in git)
├── tailwind.config.js             # Tailwind CSS configuration
├── tsconfig.json                  # TypeScript configuration
├── next.config.ts                 # Next.js configuration
└── package.json                   # Dependencies and scripts
```

## 💻 Usage

### Adding a Stock to Your Portfolio
1. Enter the stock ticker symbol (e.g., AAPL, GOOGL, TSLA)
2. Specify the quantity of shares you own
3. Enter your purchase price per share in GBP
4. Click "Add Stock"
5. The app will fetch the current price and calculate your P&L

### Viewing Your Portfolio
- **Portfolio Summary**: See your total portfolio value, cost basis, and overall P&L at the top
- **Individual Stock Cards**: Each stock shows:
  - Current price vs. purchase price
  - Current value vs. cost basis
  - Profit/Loss in GBP and percentage
  - Color-coded indicators (green for gains, red for losses)
- **Allocation Chart**: Pie chart showing what percentage of your portfolio each stock represents

### Refreshing Stock Prices
- Click the "Refresh Prices" button to update all stock prices with current market data
- The app automatically respects API rate limits with built-in delays

### Removing a Stock
- Click the "Remove" button on any stock card to delete it from your portfolio
- Your data is saved automatically in your browser's local storage

## ⚠️ API Rate Limits

**Alpha Vantage Free Tier Limits:**
- 500 API calls per day
- 5 API calls per minute

**How the app handles rate limits:**
- Automatic 300ms delay between consecutive API calls
- Falls back to purchase price if API request fails
- Error messages displayed for invalid stock symbols

**Tips:**
- Avoid refreshing prices too frequently
- Consider upgrading to a paid Alpha Vantage plan for higher limits
- The app stores your portfolio locally, so you don't need to refetch prices every time

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🚀 Future Enhancements

- 🔐 **User Authentication**: Sign up and sync portfolios across devices
- ☁️ **Cloud Storage**: Save portfolios to a database instead of just localStorage
- 📊 **Historical Charts**: View price history and performance trends
- 📈 **Portfolio Analytics**: Advanced metrics like Sharpe ratio, beta, alpha
- 💵 **Dividend Tracking**: Monitor dividend payments and yield
- 🔔 **Price Alerts**: Get notified when stocks hit target prices
- 📤 **Export Data**: Download portfolio reports as CSV or PDF
- 🌍 **Multi-Currency Support**: Support for different currencies beyond GBP
- 📱 **Mobile App**: Native iOS and Android applications
- 🤖 **Stock Recommendations**: AI-powered investment suggestions

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint code quality checks
```

## 📜 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- [Alpha Vantage](https://www.alphavantage.co/) for providing free stock market data
- [Next.js](https://nextjs.org/) for the amazing React framework
- [Recharts](https://recharts.org/) and [Chart.js](https://www.chartjs.org/) for data visualization
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide React](https://lucide.dev/) for beautiful icons

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- MARKDOWN LINKS & IMAGES -->
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[TailwindCSS]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[Recharts]: https://img.shields.io/badge/Recharts-FF6384?style=for-the-badge&logo=chart.js&logoColor=white
[Recharts-url]: https://recharts.org/
[ChartJS]: https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chart.js&logoColor=white
[ChartJS-url]: https://www.chartjs.org/
[Axios]: https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white
[Axios-url]: https://axios-http.com/
