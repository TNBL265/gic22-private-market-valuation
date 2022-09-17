<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<div align="center">
    <h3>GIC #CODETOIMPACT 2022</h3>
    <p align="center">
        <br />
        <a href="">Microservices Architecture</a>
        .
        <a href="">View Demo</a>
    </p>
</div>

<!-- ABOUT THE PROJECT -->
## About The Project
An end-to-end private market valuation capabilities, which will allow for timely
investment decision-making within a given window of opportunity.
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started
### Prerequisites
- [Node.js 12.22.0](https://nodejs.org/en/) or later
- [Python 3.9](https://www.python.org/downloads/) or later
### Installation
1. Clone the repo
```shell
git clone https://github.com/TNBL265/gic22-private-market-valuation.git
cd gic22-private-market-valuation
```
2. Start backend [flask-server](./flask-server)
- Setup virtual environment
```shell
cd flask-server
python -m venv env
source env/bin/activate
pip install -r requirements.txt
```
- Run flask
```shell
flask run
```
3. Start next.js development server
```shell
npm run dev
# or
yarn run dev
# or
pnpm run dev
```
### Sanity check:
- Visit `http://localhost:3000/`
  - [index.tsx](./pages/index.tsx) is fetching route `/instruments/`
  - `/instruments/` is redirected to `http://127.0.0.1:5000/instruments` following `rewrites` specified in [next.config.js](./next.config.js) 
- Visit `http://localhost:3000/api/hello.ts`
  - run typescript API response under [pages/api/hello.ts](./pages/api/hello.ts)