const estados = {
    "BR-AC": "AC",
    "BR-AL": "AL",
    "BR-AP": "AP",
    "BR-AM": "AM",
    "BR-BA": "BA",
    "BR-CE": "CE",
    "BR-DF": "DF",
    "BR-ES": "ES",
    "BR-GO": "GO",
    "BR-MA": "MA",
    "BR-MT": "MT",
    "BR-MS": "MS",
    "BR-MG": "MG",
    "BR-PA": "PA",
    "BR-PB": "PB",
    "BR-PR": "PR",
    "BR-PE": "PE",
    "BR-PI": "PI",
    "BR-RJ": "RJ",
    "BR-RN": "RN",
    "BR-RS": "RS",
    "BR-RO": "RO",
    "BR-RR": "RR",
    "BR-SC": "SC",
    "BR-SP": "SP",
    "BR-SE": "SE",
    "BR-TO": "TO"
};

const dadosPorEstado = {
    "AC": [4.802631578947368, 9.473684210526317, 0.19736842105263158],
    "AL": [11.364421416234888, 21.830742659758204, 0.5872193436960277],
    "AM": [5.952380952380952, 17.692307692307693, 1.5018315018315018],
    "AP": [6.370875995449373, 15.927189988623436, 0.7963594994311717],
    "BA": [5.861445407495167, 14.329363347259463, 0.841803329799838],
    "CE": [14.827405857740587, 32.36140167364017, 1.778242677824268],
    "DF": [26.493108728943337, 47.24349157733537, 2.3736600306278715],
    "ES": [19.72059779077323, 33.98310591293047, 2.046783625730994],
    "GO": [14.77126977340744, 39.82471141513467, 1.496365968362548],
    "MA": [3.873732074151801, 10.055963623644631, 0.38474991255683805],
    "MG": [15.890045708481463, 43.06119857795835, 1.9743524631792786],
    "MS": [17.142857142857142, 48.40659340659341, 1.3186813186813187],
    "MT": [12.175502742230346, 33.16270566727605, 1.5722120658135286],
    "PA": [6.603419124553824, 16.56021040766485, 0.5729851587450685],
    "PB": [9.816082121471343, 20.273738237810093, 0.7698887938408896],
    "PE": [13.136227544910179, 23.22854291417166, 0.873253493013972],
    "PI": [9.001910219675263, 21.227316141356255, 0.5253104106972302],
    "PR": [24.968540268456376, 42.973993288590606, 2.6531040268456376],
    "RJ": [17.212688507540303, 38.15219275437684, 1.794071762870515],
    "RN": [12.271009014248328, 28.496656004652515, 1.4248328002326258],
    "RO": [16.74757281553398, 40.93851132686084, 1.132686084142395],
    "RR": [8.295964125560538, 12.331838565022421, 0.336322869955157],
    "RS": [21.591820368885326, 40.44707297514034, 1.202886928628709],
    "SC": [14.940449268807479, 38.56475199758782, 14.955525403286599],
    "SE": [8.85085574572127, 22.78728606356968, 0.6845965770171148],
    "SP": [11.213211249182473, 38.06082406801831, 0.7259646827992152],
    "TO": [6.750788643533124, 19.68454258675079, 1.2618296529968454]
};

const regionsInfo = {};

for (const estado in estados) {
    const stateCode = estados[estado];
    const valores = dadosPorEstado[stateCode].map(valor => valor.toFixed(2));
    regionsInfo[estado] = `Ciências: ${valores[0]}%<br>Informática: ${valores[1]}%<br>Educ. Prof.: ${valores[2]}%`;
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
    tooltip.innerHTML = `<center>${id}</center><br>${percentual}`;
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
