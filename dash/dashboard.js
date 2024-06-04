function selectOption(option) {
    console.log("Opção selecionada:", option);
}

// Dados para o gráfico 1
const data1 = {
    labels: ['Sim', 'Não'],
    datasets: [{
        label: 'Frequência',
        data: [177181, 3049],
        backgroundColor: ['#0090FF', '#BA272A'], 
        borderColor: ['#0090FF', '#BA272A'],
        borderWidth: 1
    }]
};

// Dados para o gráfico 2
const data2 = {
    labels: ['Federal', 'Estadual', 'Municipal', 'Privada'],
    datasets: [{
        label: 'Percentual',
        data: [0.3, 15.4, 60.1, 24.2],
        backgroundColor: ['#BA272A', '#08A613', '#F2E205', '#FF9812'],  
        borderColor: ['#BA272A', '#08A613', '#F2E205', '#FF9812'],
        borderWidth: 1
    }]
};

// Dados para o gráfico 3
const data3 = {
    labels: ['Sim', 'Não'],
    datasets: [{
        label: 'Frequência',
        data: [22616, 157614],
        backgroundColor: ['#0090FF', '#BA272A'],  
        borderColor: ['#0090FF', '#BA272A'],
        borderWidth: 1
    }]
};

// Dados para o gráfico 4
const data4 = {
    labels: ['Sim', 'Não'],
    datasets: [{
        label: 'Frequência',
        data: [54470, 125760],
        backgroundColor: ['#0090FF', '#BA272A'],  
        borderColor: ['#0090FF', '#BA272A'],
        borderWidth: 1
    }]
};

// Dados para o gráfico 5
const data5 = {
    labels: ['CENTRO OESTE', 'NORDESTE', 'NORTE', 'SUDESTE', 'SUL'],
    datasets: [{
        label: 'Percentual',
        data: [5.3, 35.1, 11.7, 34.8, 13.2],
        backgroundColor: ['#BA272A', '#0090FF', '#FFCB01', '#C2D5DB', '#08A613'],  
        borderColor: ['#BA272A', '#0090FF', '#FFCB01', '#C2D5DB', '#08A613'],
        borderWidth: 1
    }]
};

function createChart(ctx, type, data) {
    new Chart(ctx, {
        type: type,
        data: data
    });
}

window.onload = function() {
    const ctx1 = document.getElementById('grafico1').getContext('2d');
    createChart(ctx1, 'pie', data1);

    const ctx2 = document.getElementById('grafico2').getContext('2d');
    createChart(ctx2, 'pie', data2);

    const ctx3 = document.getElementById('grafico3').getContext('2d');
    createChart(ctx3, 'pie', data3);

    const ctx4 = document.getElementById('grafico4').getContext('2d');
    createChart(ctx4, 'pie', data4);

    const ctx5 = document.getElementById('grafico5').getContext('2d');
    createChart(ctx5, 'pie', data5);
};
