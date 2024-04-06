document.addEventListener('DOMContentLoaded', () => {
    const dailyBalanceCtx = document.getElementById('dailyBalanceChart').getContext('2d');
    new Chart(dailyBalanceCtx, {
        type: 'line',
        data: {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            datasets: [{
                label: 'Daily Balance',
                data: [12345, 12500, 12200, 12800, 13000],
                backgroundColor: 'rgba(138, 43, 226, 0.2)',
                borderColor: 'rgba(138, 43, 226, 1)',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    const historyCtx = document.getElementById('historyChart').getContext('2d');
    new Chart(historyCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            datasets: [{
                label: 'Expenses',
                data: [300, 600, 400, 500, 700],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1
            },
            {
                label: 'Income',
                data: [800, 1200, 900, 1500, 2000],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
});
