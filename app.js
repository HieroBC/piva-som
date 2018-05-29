var Kohonen = require ('./src/kohonen');

console.log('Rede importada');

var som = new Kohonen(2);

som.AddNeuron(0, [10,10], [ ]);
som.AddNeuron(1, [20,10], [0]);
som.AddNeuron(2, [30,10], [1]);
som.AddNeuron(3, [10,20], [0]);
som.AddNeuron(4, [20,20], [1,3]);
som.AddNeuron(5, [30,20], [4,2]);
som.AddNeuron(6, [10,30], [3]);
som.AddNeuron(7, [20,30], [4,6]);
som.AddNeuron(8, [30,30], [5,7]);

var dataset = [
    [28,27],
    [29,9],
    [16,16]
],
tx_aprendizado = 0.5,
gr_vizinhanca = 1;


som.Train(dataset, tx_aprendizado, gr_vizinhanca);

som.Print();

