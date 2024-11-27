let balance = 1000;
let portfolio = {};

// Show the correct page
function showPage(page) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById(page).style.display = 'block';
}

// Buy stock
function buyStock(company, price) {
    if (balance >= price) {
        balance -= price;
        portfolio[company] = (portfolio[company] || 0) + 1;
        updatePortfolio();
        alert(`You bought 1 share of ${company}`);
    } else {
        alert("Insufficient balance!");
    }
}

// Sell stock
function sellStock(company, price) {
    if (portfolio[company] && portfolio[company] > 0) {
        portfolio[company] -= 1;
        balance += price;
        if (portfolio[company] === 0) delete portfolio[company];
        updatePortfolio();
        alert(`You sold 1 share of ${company}`);
    } else {
        alert(`You don't own any shares of ${company}`);
    }
}

// Update portfolio display
function updatePortfolio() {
    document.getElementById('balance').textContent = balance;

    const portfolioTable = document.getElementById('portfolioTable');
    portfolioTable.innerHTML = `
        <tr>
            <th>Company</th>
            <th>Quantity</th>
            <th>Action</th>
        </tr>
    `;

    for (const [company, quantity] of Object.entries(portfolio)) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${company}</td>
            <td>${quantity}</td>
            <td><button onclick="sellStock('${company}', ${getPrice(company)})">Sell</button></td>
        `;
        portfolioTable.appendChild(row);
    }
}

// Get stock price (hardcoded for now)
function getPrice(company) {
    const prices = {
        "FlyUS": 50,
        "Grotti": 120,
        "Maze Bank": 200
    };
    return prices[company];
}
