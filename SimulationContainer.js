// Container class

function SimulationContainer() 
    {
    this.sims = [];
    }
    
SimulationContainer.prototype.Animate = function() 
    {
    for (var i = 0; i < this.sims.length; i++) 
        {
        this.sims[i].Animate();
        };
    }

SimulationContainer.prototype.Add = function(newsim) 
    {
    this.sims.push(newsim);        
    }