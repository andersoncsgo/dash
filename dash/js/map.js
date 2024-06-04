const estados = {
    "BR-AC": "NORTE",
    "BR-AL": "NORDESTE",
    "BR-AP": "NORTE",
    "BR-AM": "NORTE",
    "BR-BA": "NORDESTE",
    "BR-CE": "NORDESTE",
    "BR-DF": "OESTE",
    "BR-ES": "SUDESTE",
    "BR-GO": "OESTE",
    "BR-MA": "NORDESTE",
    "BR-MT": "OESTE",
    "BR-MS": "OESTE",
    "BR-MG": "SUDESTE",
    "BR-PA": "NORTE",
    "BR-PB": "NORDESTE",
    "BR-PR": "SUL",
    "BR-PE": "NORDESTE",
    "BR-PI": "NORDESTE",
    "BR-RJ": "SUDESTE",
    "BR-RN": "NORDESTE",
    "BR-RS": "SUL",
    "BR-RO": "NORTE",
    "BR-RR": "NORTE",
    "BR-SC": "SUL",
    "BR-SP": "SUDESTE",
    "BR-SE": "NORDESTE",
    "BR-TO": "NORTE"
};

//Dados fictícios - Implementação prevista para 01/06/24
const data5 = {
    labels: ['NORDESTE', 'NORTE', 'SUDESTE', 'SUL', 'OESTE'],
    data: [5.3, 35.1, 11.7, 34.8, 13.2]
};

function getPercentual(regiao) {
    const index = data5.labels.indexOf(regiao);
    return data5.data[index];
}

const regionsInfo = {};

for (const estado in estados) {
    const regiao = estados[estado];
    const percentual = getPercentual(regiao);
    regionsInfo[estado] = `${percentual}%`;
}

console.log(regionsInfo);

const regions = {
    norte: ["BR-AC", "BR-AP", "BR-AM", "BR-PA", "BR-RO", "BR-RR", "BR-TO"],
    nordeste: ["BR-AL", "BR-BA", "BR-CE", "BR-MA", "BR-PB", "BR-PE", "BR-PI", "BR-RN", "BR-SE"],
    sudeste: ["BR-ES", "BR-MG", "BR-RJ", "BR-SP"],
    sul: ["BR-PR", "BR-RS", "BR-SC"],
    oeste: ["BR-DF", "BR-GO", "BR-MT", "BR-MS"]
};

document.addEventListener("DOMContentLoaded", function() {
    const img = document.getElementById('svgImage');
    fetch(img.src)
        .then(response => response.text())
        .then(svgText => {
            const div = document.createElement('div');
            div.innerHTML = svgText;
            const svgElement = div.querySelector('svg');
            svgElement.id = 'mapa';  
            document.querySelector('.svg-container').appendChild(svgElement);
            img.style.display = 'none'; 

            const paths = svgElement.getElementsByTagName('path');

            for (let path of paths) {
                path.addEventListener('mouseover', showInfo);
                path.addEventListener('mouseout', hideInfo);
            }
        });

    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const regionClass = this.value;

            regions[regionClass].forEach(stateId => {
                const stateElement = document.getElementById(stateId);
                if (this.checked) {
                    stateElement.classList.add('highlighted');
                    stateElement.removeEventListener('mouseover', showInfo);
                    stateElement.removeEventListener('mouseout', hideInfo);
                } else {
                    stateElement.classList.remove('highlighted');
                    stateElement.addEventListener('mouseover', showInfo);
                    stateElement.addEventListener('mouseout', hideInfo);
                }
            });
        });
    });
});

function showInfo(event) {
    const id = event.target.id;
    const percentual = regionsInfo[id];
    const tooltip = document.createElement('div');
    tooltip.id = 'tooltip';
    tooltip.innerHTML = `${id}: ${percentual}`;
    document.body.appendChild(tooltip);

    function moveTooltip(e) {
        const tooltipWidth = tooltip.offsetWidth;
        const tooltipHeight = tooltip.offsetHeight;
        let left = e.pageX + 10;
        let top = e.pageY + 10;

        if (left + tooltipWidth > window.innerWidth) {
            left = e.pageX - tooltipWidth - 10;
        }

        if (top + tooltipHeight > window.innerHeight) {
            top = e.pageY - tooltipHeight - 10;
        }

        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
    }

    event.target.addEventListener('mousemove', moveTooltip);

    event.target.addEventListener('mouseout', function() {
        document.body.removeChild(tooltip);
        event.target.removeEventListener('mousemove', moveTooltip);
    }, { once: true });
}

function hideInfo(event) {
    console.log('Mouse out');
}
