const ctx = document.querySelector('#myChart');

const graphData =  {
    type: 'line',
    data: {
        labels: ['Mon', 'Tue', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
  };




const myChart = new Chart(ctx, graphData)


const socket = new WebSocket('ws://localhost:8000/ws/graph/')
socket.onmessage = function(e){
    const data = JSON.parse(e.data)
    let newGraph = graphData.data.datasets[0].data
    let newDays = graphData.data.labels

    newGraph.shift()
    newDays.shift()

    newGraph.push(data.value)
    newDays.push(data.day)

    graphData.data.datasets[0].data = newGraph
    graphData.data.labels = newDays
    myChart.update()
}

console.log('hello world');
