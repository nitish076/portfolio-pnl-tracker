This is a Basic Portfolio & PnL Tracker Project.

*******Notes********

Uses FIFO (First-In-First-Out) method for PnL calculation.
Have avoided short selling options.

******APIS*********
=============================
TRADES API
=============================
Endpoints:
- GET  /api/trades
  → Get all trades

- POST /api/trades
  → Add a new trade

=============================
Portfolio API
=============================
Endpoints:
- GET  /api/portfolio
  → Get portfolio positions and details

=============================
PnL API
=============================

Endpoints:
- GET  /api/pnl
  → Get profit and loss calculations

- POST /api/pnl/prices
  → Update market prices for PnL calculations

*******Docker********
``` docker build -t portfolio-pnl-tracker .  ``` - build docker.

```docker run -p 3000:3000 portfolio-pnl-tracker``` - Run Docker Container Image.

API Available At : http://localhost:3000/api
