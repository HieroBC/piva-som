const fs = require ('fs');

var Kohonen = function (dimension) {
    // private variables
    this.dimension = dimension;
    this.neuronsId = [];
    this.neurons = [];

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

    /// pass an Id and returns a neuron object reference
    this.getNeuronById = function (neuronId) {
        for (var i = 0 ; i < this.neurons.length ; i++){
            if (this.neurons[i].id === neuronId) {
                return this.neurons[i];
            }
        }
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

    //function that changes a given array of neurons
    this.setNewWeights = function (neuronIdArray, learningRate, point) {
        neuronIdArray.forEach((neuronId) => {
            var neuron = this.getNeuronById(neuronId);
            for (var i = 0 ; i < dimension ; i++) {
                neuron.weight[i] = neuron.weight[i] + learningRate * (point[i] - neuron.weight[i]);
            }
        });
    }

    // function that finds all neurons to update
    this.Recalibrate = function (winnerId, neighbourhood, learningRate, point) {
        var neuronsToUpdate = [];
        var consultedNeurons = [];
        neuronsToUpdate.push(winnerId);
        for (var i = 0 ; i < neighbourhood ; i++) {
            neuronsToUpdate.forEach((n) => {
                var thisNeuron = this.getNeuronById(n);
                thisNeuron.neighboursId.forEach((nId) => {
                    if(!neuronsToUpdate.includes(nId)){
                        neuronsToUpdate.push(nId);
                    }
                });
                consultedNeurons.push(n);
            });
        }
        console.log('Updating neurons', neuronsToUpdate);
        this.setNewWeights(neuronsToUpdate, learningRate, point);
    }
    
    /// Function that receives all training set and train
    this.Train = function (trainingSet, learningRate, neighbourhood) {
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
            this.Recalibrate(winner, neighbourhood, learningRate, point);
        });
    }

    // Function that receives the dataset and groups them to clusters.
    this.Cluster = function (dataSet) {
        if (!(Array.isArray(dataSet))) throw Error ('Data set must be a W-length-dimensional Array. Your W-length is', this.dimension);
        var winner = 0, higher = Number.MAX_SAFE_INTEGER;

        var clusters = [];
        for (var i = 0 ; i < this.neuronsId.length ; i++){
            clusters.push({ cluster_id: this.neuronsId[i], data: []});
        }
        
        dataSet.forEach((point) => {
            var winner = 0, closestDistance = Number.MAX_SAFE_INTEGER, distance = 0;

            this.neurons.forEach((neuron) => {
                distance = neuron.Euclides(point);
                if(distance < closestDistance){
                    winner = neuron.id;
                    closestDistance = distance;
                }
            });
            var i = 0;
            for (i = 0 ; i < this.neuronsId.length ; i++){
                if (this.neuronsId[i] === winner) {
                    clusters[i].data.push(point);
                    break;
                }
            }

            console.log('Point [' + point + '] belongs to Cluster ' + i);
        });
        return clusters;
    }

    /// Function that prints the Kohonen Network's State
    this.Print = function () {
        this.neurons.forEach((x) => {
            console.log({
                Neuron_ID: x.id,
                Weight: x.weight,
                Neighbours: x.neighboursId
            });
            console.log('=========================');
        });
    };

    // this.getNeuronArray = function () {
    //     return this.neurons;
    // }

    this.findNeuronInPosition = function (x, y) {
        var returnValue = null;
        this.neurons.forEach((n) => {
            if ((Math.floor(n.weight[0] + 0.5)) === x && (Math.floor(n.weight[1] + 0.5)) === y) {
                returnValue = n.id;
            }
        });
        return returnValue;
    };
    
    this.writeGraphic = function (xr, yt, xl, yb) {
        canvas = { xr: xr, yt: yt, xl: xl || 0, yb: yb || 0 };
        var g = '\n';

        for (var i = canvas.yt ; i > canvas.yb ; i--){
            for (var j = canvas.xl ; j < canvas.xr ; j++){
                
                var neuronId = this.findNeuronInPosition(j, i);
                if(neuronId != null){
                    console.log('#',neuronId,'#');
                    g +=( '[' + neuronId.toString() + ']' );
                } else {
                    g += '[ ]';
                }
            }
            g+= '\n';
        }
        // add each neuron label and weights.
        console.log(g);

        //save to file
        fs.writeFileSync('./graphic.dat', g);
    };
}

module.exports = Kohonen;