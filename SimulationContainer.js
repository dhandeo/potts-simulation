// Container class

function SimulationContainer() 
    {
    this.sims = [];
    }
    
SimulationContainer.prototype.Animate = function(timer) 
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
            alert("All Done !");
            window.clearInterval(timer);
            return 1;           
            }
        };
        return 0;
    }

SimulationContainer.prototype.Initialize = function()
    {
    this.sims = [];
    }

SimulationContainer.prototype.Reset = function(timer) 
    {
    for (var i = 0; i < this.sims.length; i++) 
        {
        this.sims[i].Init();
        };
        return 0;
    }


SimulationContainer.prototype.Add = function(newsim) 
    {
    this.sims.push(newsim);        
    }