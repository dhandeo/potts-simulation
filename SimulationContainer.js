// Container class

function SimulationContainer() 
    {
    this.sims = [];
    }
    
SimulationContainer.prototype.Animate = function() 
    {
    var done = 0;
    for (var i = 0; i < this.sims.length; i++) 
        {
        this.sims[i].Animate();
        if(this.sims[i].done === 1) 
            {
            done ++;
            }
        if (done === this.sims.length)
            {
            alert("All Done !")
            }
        };
    }

SimulationContainer.prototype.Add = function(newsim) 
    {
    this.sims.push(newsim);        
    }