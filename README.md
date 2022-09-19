<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<div align="center">
    <h2>GIC #CODETOIMPACT 2022</h2>
        <h3>1st runner-up</h3>
    
</div>

<!-- ABOUT THE PROJECT -->
## About The Project
An end-to-end private market valuation capabilities, which will allow for timely
investment decision-making within a given window of opportunity.

Check out our [presentation slides](presentation.pdf). 
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started
### Prerequisites
- [Node.js 12.22.0](https://nodejs.org/en/) or later
- [Python 3.9](https://www.python.org/downloads/) or later
### Installation (MacOS)
1. Clone the repo
```shell
git clone https://github.com/TNBL265/gic22-private-market-valuation.git
cd gic22-private-market-valuation
```
2. Start backend [flask_server](./flask_server) on a terminal
- Setup virtual environment
```shell
cd flask_server
python -m venv env
source env/bin/activate
pip install -r requirements.txt
```
- Run flask
```shell
python wsgi.py
```
> For first run, open a different terminal to seed the local SQLite database first
> ```shell
> cd flask_server
> python seed.py
> ```
3. Start frontend nextjs server on a terminal
- Install packages
```shell
npm i -f
```
- Run nextjs
```shell
npm run dev
```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Acknowledgements
- Hackers
  - Sourabh Raj Jaiswal [@]srj31(https://github.com/srj31) (Frontend)
  - Jun Leong Hoe [@hjunleon](https://github.com/hjunleon) (Frontend)
  - Tran Nguyen Bao Long [@TNBL265](https://github.com/TNBL265) (Backend + DevOps)
  - Ryan Khong [@celerie](https://github.com/celerie)
- Mentors
  - [John Tan Yeong Zhuang](https://www.linkedin.com/in/john-tan-yeong-zhuang/)
  - [Dennis Mathew Simon](https://www.linkedin.com/in/dennismathewsimon/?originalSubdomain=sg) 
  - [Goh Wei Xiang](https://www.linkedin.com/in/gohweixiang/)
