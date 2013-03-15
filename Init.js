

function start() 
    {
    var sims = [];
    // Add two simulations
    // sims.push(new Simulation(10,10));
    for(var a = 0; a < 10; a ++)
        {
        sims.push(new SynapticRearrangement(10,10, 2));
        }

    window.setInterval(function() {
            for (var i = 0; i < sims.length; i++) 
                {
                sims[i].Animate();
                };
            }, 0);
    }

