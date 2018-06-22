var Kohonen = require ('./src/kohonen');

console.log('Rede importada');

var som2005 = new Kohonen(1);
var som2011 = new Kohonen(1);

    const      Norte = 0
    ,       Nordeste = 1
    ,   Centro_Oeste = 2
    ,        Sudeste = 3
    ,            Sul = 4

        //        id              pesos    vizinhos
som2005.AddNeuron(Norte         , [28.14], [ ]);
som2005.AddNeuron(Nordeste      , [24.55], [0]);
som2005.AddNeuron(Centro_Oeste  , [50.63], [0,1]);
som2005.AddNeuron(Sudeste       , [40.45], [1,2]);
som2005.AddNeuron(Sul           , [47.13], [2,3]);

som2011.AddNeuron(Norte         , [64.24], [ ]);
som2011.AddNeuron(Nordeste      , [56.31], [0]);
som2011.AddNeuron(Centro_Oeste  , [79.23], [0,1]);
som2011.AddNeuron(Sudeste       , [73.23], [1,2]);
som2011.AddNeuron(Sul           , [73.17], [2,3]);


var dataset2005 = [
    [31.4], // AC
    [25.6], // AM
    [31.6], // RO
    [24.6], // RR
    [27.0], // TO
    [24.4], // PA
    [32.4], // AP
    [14.2], // MA
    [16.8], // PI
    [25.1], // CE
    [31.6], // RN
    [30.7], // PE
    [26.2], // PB
    [33.4], // SE
    [22.0], // AL
    [21.0], // BA
    [38.8], // MT
    [48.7], // MS
    [48.7], // GO
    [66.3], // DF
    [40.7], // SP
    [48.5], // RJ
    [36.8], // ES
    [35.8], // MG
    [40.8], // PR
    [54.7], // RS
    [45.9]  // SC
];

var dataset2011 = [
    [62.3], // AC
    [59.5], // AM
    [66.4], // RO
    [71.8], // RR
    [67.4], // TO
    [57.2], // PA
    [65.1], // AP
    [45.2], // MA
    [52.2], // PI
    [58.2], // CE
    [66.8], // RN
    [64.6], // PE
    [63.6], // PB
    [67.3], // SE
    [57.8], // AL
    [61.1], // BA
    [74.9], // MT
    [77.2], // MS
    [77.7], // GO
    [87.1], // DF
    [76.0], // SP
    [74.0], // RJ
    [73.7], // ES
    [69.2], // MG
    [70.4], // PR
    [76.9], // RS
    [72.2]  // SC
]




tx_aprendizado = 0.5,
gr_vizinhanca = 0;

// TREINAMENTO 2005
console.log('\nTREINAMENTO 2005\n');
som2005.Train(dataset2005, tx_aprendizado, gr_vizinhanca);
som2005.Print();

var clusters2005 = som2005.Cluster(dataset2005);
clusters2005.forEach((cluster) => {
    console.log(cluster);
    console.log('==============================================================================');
});

// TREINAMENTO 2011
console.log('\nTREINAMENTO 2011\n');
som2011.Train(dataset2011, tx_aprendizado, gr_vizinhanca);
som2011.Print();

var clusters2011 = som2011.Cluster(dataset2011);
clusters2011.forEach((cluster) => {
    console.log(cluster);
    console.log('==============================================================================');
});
