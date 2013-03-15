

function start() 
    {
    var container = new SimulationContainer();
    
    // Add two simulations
    for(var a = 0; a < 10; a ++)
        {
        container.Add(new SynapticRearrangement(5, 5, 2));
        }

    window.setInterval(function() {
            container.Animate();
            }, 0);
    }

