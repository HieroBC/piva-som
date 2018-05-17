var Kohonen = function (dimension) {
    // private variables
    this.dimension = dimension;
    this.neuronsId = [];
    this.neurons = [];
    //this.trainingSet = [];

    //NEURON DEFINITION
    this.Neuron = function(id, weight, neighboursId, neuronsId) {
        this.id = 0;
        this.weight = [];
        this.neighboursId = [];
        
        /// object constructor
        if (neuronsId.includes(id)){
            //throw Error('Neuron id already exists!');
            console.log('error -1');
            this.id = -1;
        } else
        if (!Array.isArray(weight) ||  weight.length != dimension) {
            //throw Error('Wrong weights length');
            console.log('error -2');
            this.id = -2;
        } else {
            let f = neighboursId.filter(x => neuronsId.includes(x));
            if (f.length != neighboursId.length) {
                //throw Error('One or more neighbour neurons specified have not been created yet. Please create');
                console.log('error -3');
                this.id = -3;
            } else {
                // aqui everything ok
                this.id = id;
                this.weight = weight;
                this.neighboursId = neighboursId;
                // @TODO -> falta adicionar este neuronio como vizinho dos que estamos passando.
            }
        };
        
        /// Euclidian distance calculator
        this.Euclides = function (point) {
            let total = 0;
            if(point.length != this.weight.length){
                console.log('Point has wrong dimensions');
                throw Error('Point has wrong dimensions');
            } else {
                for (var i = 0 ; i < this.weight.length ; i++){
                    total += Math.pow((this.weight[i] - point[i]), 2);
                };
                return Math.sqrt(total);
            }
        }
        /// Adjust weights
        // AdjustWeights : function () {
        //     // something here
        // }
    };

    /// Function to reciprocate the neighbours of a neuron n
    this.Reciprocate = function (n) {
        n.neighboursId.forEach((nId) => {
            this.neurons.forEach((neuron) => {
                if (nId === neuron.id) {
                    neuron.neighboursId.push(n.id);
                };
            });
        });
    };

    /// Function that creates a new neuron and adds it tho the Kohonen Network. receives an integer id, an array of weights for the dimension and an array of neighboursId
    this.AddNeuron = function (id, w, nbs) {
        // check validations
        if (id < 0) throw Error ('Id must be 0 or higher');
        if (!(Array.isArray(w) && w.length === this.dimension)) throw Error ('Weight has incorrect dimension');
        if (!(Array.isArray(nbs) && nbs.length <= this.neuronsId.length)) throw Error ('Neighbours provided is not an array or has too much neighbours');
        
        // if everything is okay, create a new neuron.
        var n = new this.Neuron(id, w, nbs, this.neuronsId);
        if(n.id >= 0){
            this.neurons.push(n);
            this.neuronsId.push(n.id);
            this.Reciprocate(n); // reciprocar os vizinhos
            console.log('Neuron added!');
        } else {
            console.log('whoops. error.');
        }
    };

    
    /// Function that receives training set and sets it
    
    /// Function that receives all training set and train
    this.Train = function (trainingSet) {
        if (!(Array.isArray(trainingSet))) throw Error ('Training set must be a bidimensional Array.');
        var winner = 0, higher = Number.MAX_SAFE_INTEGER;       

        trainingSet.forEach((point) => {
            var winner = 0, closestDistance = Number.MAX_SAFE_INTEGER, distance = 0;

            this.neurons.forEach((neuron) => {
                distance = neuron.Euclides(point);
                if(distance < closestDistance){
                    winner = neuron.id;
                    closestDistance = distance;
                }
            });
            console.log('Neuron ' + winner + ' is BMU for point [' + point + '] with distance of ' + closestDistance);
            // call function: reorganize(winner);
        });
    }

    /// Function that prints the Kohonen Network's State
    this.Print = function () {
        this.neurons.forEach((x) => {
            console.log(x);
            console.log('=========================');
        });
    };
}

module.exports = Kohonen;

/*

peso novo = peso anterior + taxa de aprendizado * funcao de vizinhanca * diferenca entre feature e peso

funcao de vizinhanca: grau de vizinhanca

*/